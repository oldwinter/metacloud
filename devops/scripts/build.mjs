#!/usr/bin/env zx

// https://github.com/google/zx
// 这种用mjs后缀名的用法，写的时候没有js自动补全，但是执行更方便。

// eg:  zx devops/scripts/build.mjs --targetenv prod --repo $(minikube ip) --port 5000 --version v1 
let targetenv = argv.targetenv ??  "prod"  
let repo = argv.repo ?? "localhost"
let port = argv.port ?? "5000"
let addr = `${repo}:${port}`
let version = argv.version ?? "v0.0.1"

// 在本机构建镜像
await $`docker build -f portal/.${targetenv}container/Dockerfile ./portal -t ${addr}/portal:${version}`
await $`docker build -f server/gin/.${targetenv}container/Dockerfile ./server/gin -t ${addr}/server-gin:${version}`
await $`docker build -f server/toy/.${targetenv}container/Dockerfile ./server/toy -t ${addr}/server-toy:${version}`

await $`docker pull mysql:8.0`
await $`docker pull redis:7.0-rc-bullseye`
await $`docker tag mysql:8.0 ${addr}/mysql:8.0`
await $`docker tag redis:7.0-rc-bullseye ${addr}/redis:7.0-rc-bullseye`