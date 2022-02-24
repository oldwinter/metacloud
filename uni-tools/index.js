import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'
figlet.parseFont('Standard', standard);

import prompts from 'prompts'
import ora from 'ora';
import { oraPromise } from 'ora';
import chalk from 'chalk';

import { exec, execSync } from 'child_process'
import boxen from 'boxen';
import clear from 'clear';
import { resolve } from 'path';
import { rejects } from 'assert';
import util from 'util'

const execP = util.promisify(exec);

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
          { title: 'dfromd', description: 'create a container reuse your host resource like docker and k8s', value: 'dfromd' }
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

  const spin1 = ora('rm -rf metacloud').start()
  await execP('rm -rf metacloud')
  spin1.succeed()

  const spinnerCloneCode = ora('git clone ...').start()
  let childGit = await execP('git clone https://github.com/oldwinter/metacloud.git')
  spinnerCloneCode.succeed('git clone done')

  const spinnerNpmInstall = ora('npm install ...').start()
  let childNpm = await execP('npm install -g @vscode/dev-container-cli')
  spinnerNpmInstall.succeed('npm install done')

   // 如果是dind模式，这里只build main devcontainer，其他container，需要在main里面build
   const spinnerDockerBuild = ora('main devcontainer build ...').start()
   let childBuild = await execP('devcontainer build ./metacloud --image-name meta-dev-admin:latest')
   spinnerDockerBuild.succeed('main devcontainer build done')

  if (localOrRemote === 'locally' && dindOrDfromD === 'dind') {

  }

  if (localOrRemote === 'locally' && dindOrDfromD === 'dfromd') {

    const spinnerDockerBuild1 = ora('portal devcontainer build ...').start()
    let childBuild1 = await execP('devcontainer build ./metacloud/portal --image-name meta-dev-portal:latest')
    spinnerDockerBuild1.succeed('portal devcontainer build done')

    const spinnerDockerBuild2 = ora('server-gin devcontainer build ...').start()
    let childBuild2 = await execP('devcontainer build ./metacloud/server/gin --image-name meta-dev-server-gin:latest')
    spinnerDockerBuild2.succeed('server-gin devcontainer build done')

    const spinnerDockerBuild3 = ora('server-toy devcontainer build ...').start()
    let childBuild3 = await execP('devcontainer build ./metacloud/server/toy --image-name meta-dev-server-toy:latest')
    spinnerDockerBuild3.succeed('server-toy devcontainer build done')


  }

  if (devRole === "frontend") {
    console.log(`${chalk.bold.green('go on with README.md chapter : 2.3')}`)
    // console.log(`${chalk.bold.green('cd metacloud/portal')}`)
    // console.log(`${chalk.bold.green('npm install')}`)
    // console.log(`${chalk.bold.green('npm run dev')}`)
    // console.log(`${chalk.bold.cyan('open browser')}`)
  }
  if (devRole === "fullstack") {
    console.log(`${chalk.bold.green('go on with README.md chapter : 2.3')}`)
    // console.log(`${chalk.bold.green('cd metacloud')}`)
    // console.log(`${chalk.bold.green('docker compose up -f devops/docker-compose.yaml')}`)
    // console.log(`${chalk.bold.cyan('open vscode')}`)
    // console.log(`${chalk.bold.cyan('ctrl+shift+p: open folder in container, choose portal/ or server/gin/ or server/toy/')}`)
  }
  if (devRole === "devops") {
    console.log(`${chalk.bold.green('go on with README.md chapter : 2.3')}`)
    // console.log(`${chalk.bold.cyan('open vscode')}`)
    // console.log(`${chalk.bold.cyan('ctrl+shift+p: open folder in container, choose metacloud/')}`)
  }


}

init().catch((e) => {
  console.error(e)
})