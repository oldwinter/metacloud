#!/usr/bin/env zx

// https://github.com/google/zx
// 这种用mjs后缀名的用法，没有自动补全，但是执行更方便。

// create ,apply, delete, get
let operType = "create"

if (true) {
    // k8s
    await $`kubectl ${operType} -f deploy/portal/portal-configmap.yaml`
    await $`kubectl ${operType} -f deploy/portal/portal-deployment.yaml`
    await $`kubectl ${operType} -f deploy/portal/portal-service.yaml`

    await $`kubectl ${operType} -f deploy/server/gin/server-gin-deployment.yaml`
    await $`kubectl ${operType} -f deploy/server/gin/server-gin-service.yaml`

    await $`kubectl ${operType} -f deploy/server/toy/server-toy-deployment.yaml`
    await $`kubectl ${operType} -f deploy/server/toy/server-toy-service.yaml`


    // istio 

    await $`kubectl ${operType} -f deploy/shared/shared-gateway.yaml`
    await $`kubectl ${operType} -f deploy/shared/shared-VirtualService.yaml`
}



