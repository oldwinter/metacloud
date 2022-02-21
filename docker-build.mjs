#!/usr/bin/env zx

// https://github.com/google/zx
// 这种用mjs后缀名的用法，没有自动补全，但是执行更方便。

// eg:  zx docker-build.mjs --repo localhost --port 5000 --version v1
// var argvs = argv.slice(2)
console.log(argv);

let addr = `${argv.repo}:${argv.port}`
let version = argv.version

// 在本机构建镜像
  await $`docker build -f portal/.prodcontainer/Dockerfile ./portal -t ${addr}/portal:${version}`
  await $`docker build -f server/gin/.prodcontainer/Dockerfile ./server/gin -t ${addr}/server-gin:${version}`
  await $`docker build -f server/toy/.prodcontainer/Dockerfile ./server/toy -t ${addr}/server-toy:${version}`

  await $`docker push -t ${addr}/portal:${version}`
  await $`docker push ${addr}/server-gin:${version}`
  await $`docker push ${addr}/server-toy:${version}`
// }
// 若远程部署，则将镜像push至指定镜像仓库
// if (localOrRemote == 'r'){
//   await $`docker tag portal:01 ${SWR_ADDR}/portal:01`
//   await $`docker tag server-gin:01 ${SWR_ADDR}/server-gin:01`
//   await $`docker tag server-toy:01 ${SWR_ADDR}/server-toy:01`

//   await $`docker push ${SWR_ADDR}/portal:01`
//   await $`docker push ${SWR_ADDR}/server-gin:01`
//   await $`docker push ${SWR_ADDR}/server-toy:01`

// }


// 待集成到根开发容器中



// let localOrRemote = await question('本机集群部署(y)或远程部署(r)? ')
// let SWR_ADDR = "111.100.100.1000" 

// if (localOrRemote == 'y') {
    
// }

// if (localOrRemote == 'r') {
//     // await question('本机集群部署(y)或远程部署(r)? ')
//     SWR_ADDR = await question('请输入远程镜像仓库地址:')
// }

