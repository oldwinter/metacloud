#!/usr/bin/env zx

// 这个脚本用来自动发布包到npm，homebrew，docker等平台
let targetenv = argv.targetenv ??  "prod"  
let repo = argv.repo ?? "localhost"
let port = argv.port ?? "5000"
let addr = `${repo}:${port}`
let version = argv.version ?? "v0.0.1"

// 推送业务镜像
await $`docker push ${addr}/portal:${version}`
await $`docker push ${addr}/server-gin:${version}`
await $`docker push ${addr}/server-toy:${version}`
await $`docker push ${addr}/mysql:8.0`
await $`docker push ${addr}/redis:7.0-rc-bullseye`
