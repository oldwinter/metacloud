#!/usr/bin/env zx
let addr = "hub.docker.com"
let version = argv.version ?? "v0.0.1"

// 构建uni-tools镜像
await $`docker build . -t ${addr}/uni-tools:${version}`

// 推送uni-tools镜像
await $`docker tag ${addr}/uni-tools:${version} ${addr}/uni-tools:latest`
await $`docker push ${addr}/uni-tools:${version}`
await $`docker push ${addr}/uni-tools:latest`
