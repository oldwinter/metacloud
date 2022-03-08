#!/usr/bin/env node
import chalk from 'chalk';
import { exec } from 'child_process';
import clear from 'clear';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js'
import ora, { oraPromise } from 'ora';
import prompts from 'prompts';
import util from 'util';
import boxen from 'boxen';
figlet.parseFont('Standard', standard);

const execPromise = util.promisify(exec);

async function init() {
  function banner() {
    let fig = figlet.textSync('METACLOUD ', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
    console.log(fig)
  }
  async function question() {
    let questions = [
      {
        type: "select",
        name: "devRole",
        message: 'what is your interest?',
        choices: [
          { title: 'frontend', description: 'quick start a browser to see what is this thing', value: 'frontend' },
          { title: 'fullstack', description: 'slow start to create some containers', value: 'fullstack' },
          { title: 'devops', description: 'feeling project whole feature', value: 'devops' }
        ],
        initial: 0,
        onRender(kleur) {
          this.msg = kleur.cyan('what is your interest?');
        },

      },
      // {
      //   type: "select",
      //   name: "localOrRemote",
      //   message: 'Develop locally or remotely',
      //   choices: [
      //     { title: 'locally (recommended)', description: 'your vscode open locally', value: 'locally' },
      //     { title: 'remotely', description: 'your vscode ssh remote', value: 'remotely', disabled: true }
      //   ],
      //   initial: 0,
      // },
      // {
      //   type: "select",
      //   name: "dindOrDfromD",
      //   message: 'dind(docker in docker) or dfromd(docker from docker)',
      //   choices: [
      //     { title: 'dind (recommended)', description: 'create a container including new docker and k8s', value: 'dind' },
      //     { title: 'dfromd', description: 'create a container reuse your host resource like docker and k8s', value: 'dfromd' }
      //   ],
      //   initial: 0,
      // },
    ]
    const onCancel = () => {
      console.log(chalk.red('✖') + ' Operation cancelled')
      process.exit(1)
    }
    let res = prompts(questions, { onCancel })
    return res
  }

  clear()
  banner()
  let result = await question()
  const {
    // localOrRemote,
    // dindOrDfromD,
    devRole
  } = result
  console.log(boxen(`${chalk.green("now:")} locally, run some container for ${chalk.cyan(devRole)} dev`, { padding: 1 }));

  const spin1 = ora('rm -rf metacloud').start()
  await execPromise('rm -rf metacloud')
  spin1.succeed()

  const spinnerCloneCode = ora('git clone ...').start()
  let childGit = await execPromise('git clone https://github.com/oldwinter/metacloud.git')
  await execPromise('chown -R 1000:1000 metacloud')
  spinnerCloneCode.succeed('git clone done')

  // mac和windows装好docker后，自带docker compose和docker-compose，linux这边要检测一下，装一下docker-compose CLI
  // https://docs.docker.com/compose/install/
  await oraPromise(execPromise('curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose  && sudo chmod +x /usr/local/bin/docker-compose'),{
    text:"install docker-compose ...",
    successText:"install docker-compose done"
  })
  // oraPromise()
  if (devRole === "frontend") {
    const spinner = ora('docker-compose up ...').start()
    // 永远先build，避免用了本地旧的同名镜像而出问题
    await execPromise('docker-compose -f metacloud/devops/docker-compose.singledev.yaml build')
    await execPromise('docker-compose -f metacloud/devops/docker-compose.singledev.yaml up -d')
    spinner.succeed('docker-compose up  done')

  } else if (devRole === "fullstack" ||  (devRole === "devops")) {
    const spinner = ora('docker-compose up ...').start()
    await execPromise('docker-compose -f metacloud/devops/docker-compose.wholedev.yaml build')
    await execPromise('docker-compose -f metacloud/devops/docker-compose.wholedev.yaml up -d')
    spinner.succeed('docker-compose up  done')

  } else if (devRole === "devops") {
    // const spinner = ora('npm install ...').start()
    // await execPromise('npm install -g @vscode/dev-container-cli')
    // spinner.succeed('npm install done')

    // const spinner2 = ora('main devcontainer build ...').start()
    // await execPromise('docker build ./metacloud/.devcontainer')
    // spinner2.succeed('main devcontainer build done')

  }
  console.log(`${chalk.bold.green('go on with README.md chapter : 2.3')}`)
}

init().catch((e) => {
  console.error(e)
})