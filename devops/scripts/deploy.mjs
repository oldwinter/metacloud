#!/usr/bin/env zx

// eg: zx deploy.mjs --stackname metacloud-stack
// eg zx deploy.mjs uninstall
let stackName = argv.stackname ?? "metacloud-stack"
let isUninstall = argv._.indexOf('uninstall') != -1
if (isUninstall) {
    await $`helm uninstall ${stackName}`
    return 0
} else {
    let stacks = await $`helm list`
    // ProcessOutput(stacks).toString()
    // console.log(stacks.stdout)
    if (stacks.stdout.indexOf(stackName) == -1) {
        await $`helm install ${stackName} devops/helm/metacloud-workflow`
    } else {
        await $`helm upgrade ${stackName} devops/helm/metacloud-workflow`
    }

}


