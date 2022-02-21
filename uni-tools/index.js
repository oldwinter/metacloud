import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

import prompts from 'prompts'
import ora from 'ora';
import chalk from 'chalk';

import { exec, execSync } from 'child_process'
import boxen from 'boxen';
import clear from 'clear';

async function init() {
  async function banner() {
    figlet.text('METACLOUD ', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    },
      (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      }
    )

  }

  async function question() {
    let questions = [
      {
        type: "select",
        name: "localOrRemote",
        message: 'Develop locally or remotely',
        choices: [
          { title: 'locally (recommended)', description: 'your vscode open locally', value: 'locally' },
          { title: 'remotely', description: 'your vscode ssh remote', value: 'remotely', disabled: true }
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "dindOrDfromD",
        message: 'dind(docker in docker) or dfromd(docker from docker)',
        choices: [
          { title: 'dind (recommended)', description: 'create a container including new docker and k8s', value: 'dind' },
          { title: 'dfromd', description: 'create a container reuse your host resource like docker and k8s', value: 'dfromd', disabled: true }
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "devRole",
        message: 'frontend or fullstack or both+devops',
        choices: [
          { title: 'frontend', description: 'quick start a browser to see what is this thing', value: 'frontend' },
          { title: 'fullstack', description: 'slow start to create some containers', value: 'fullstack' },
          { title: 'devops(recommended)', description: 'feeling project whole feature', value: 'devops' }
        ],
        initial: 0,
      }
    ]
    const onCancel = () => {
      console.log(chalk.red('✖') + ' Operation cancelled')
      process.exit(1)
    }
    let res = prompts(questions, { onCancel })
    return res
  }

  clear()
  await banner()
  let result = await question()
  const {
    localOrRemote,
    dindOrDfromD,
    devRole
  } = result
  console.log(boxen(`${chalk.green("now:")} ${chalk.cyan(localOrRemote)}, run a ${chalk.cyan(dindOrDfromD)} env for ${chalk.cyan(devRole)}`, { padding: 1 }));
  /*
  ┌─────────────┐
  │             │
  │   unicorn   │
  │             │
  └─────────────┘
  */

  execSync('rm -rf metacloud')
  const spinnerCloneCode = ora('git clone ...').start()
  let childGit = exec('git clone https://github.com/oldwinter/metacloud.git',
    (error, stdout, stderr) => {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  )

  childGit.on('close', function (code) {
    spinnerCloneCode.succeed('git clone done')
    const spinnerNpmInstall = ora('npm install ...').start()
    let childNpm = exec('npm install -g devcontainer')
    childNpm.on('close', function (code) {
      spinnerNpmInstall.succeed('npm install done')
      if (localOrRemote === 'locally' && dindOrDfromD === 'dind') {
        if (devRole === "frontend") {
          // spinner.succeed('Done. Now run:\n')
          // 等微软修复devcontainer的open功能
          console.log(`${chalk.bold.green('cd metacloud/portal')}`)
          console.log(`${chalk.bold.green('npm install')}`)
          console.log(`${chalk.bold.green('npm run dev')}`)
        }
        if (devRole === "backend") {
          console.log(`${chalk.bold.green('cd metacloud')}`)
          console.log(`${chalk.bold.green('docker compose up')}`)
        }
        if (devRole === "devops") {
          const spinnerDockerBuild = ora('devcontainer build ...').start()
          let childBuild = exec('devcontainer build ./metacloud')
          childBuild.on('close', function (code) {
            spinnerDockerBuild.succeed('devcontainer build done')
          })
          console.log(`${chalk.bold.green('open vscode')}`)
          console.log(`${chalk.bold.green('open folder in container')}`)
        }
      }
    })
  });
}

init().catch((e) => {
  console.error(e)
})