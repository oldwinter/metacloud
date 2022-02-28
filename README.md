<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://github.com/oldwinter/my-pics/blob/master/1024x1024.png">
  </a>
</p>

<h1 align="center">metacloud</h1>

<div align="center">
    <img src="https://img.shields.io/badge/golang-1.16-blue"/>
</div>

<!-- TODO: -->

---

<!-- [English](./README-en.md) | 简体中文 -->

# 1. 基本介绍

## 1.1 项目介绍

> metacloud，是工具，也是方法论：
> 作为工具，它只通过 VSCode + docker，将一台计算机，衍生出无数的独立开发环境。
> 作为方法论，它将开源社区「最新的思想」和「最热的项目」，融合到工具中，且所见即所得。

## 1.2 项目文档

<!-- [在线文档](https://doc.oldwinter.com) : <https://doc.oldwinter.com> -->

TODO

## 1.3 项目预览

[在线预览](https://demo.oldwinter.com): <https://demo.oldwinter.com>

<!-- ![系统架构图](http://.png) -->

## 1.4 项目特点

- 面向开源社区开发：不造轮子，全部基于开源项目缝合，且只选最新、最酷、最热门的项目
- 面向云原生开发：要实现 cloud native，先实现 contaier native，顺便完成 service mesh 和 devops
- 背对云平台开发：使用云却不被任何云绑定，万花丛中过，片叶不沾身

---

# 2. 快速开始

## 2.1 软件安装

注：
若要快速体验，请选择本机开发+前端开发模式，耗时约5分钟🚀
若要完整使用，请选择远程开发+运维开发模式，耗时约1天内🐶

### 2.1.1 本机开发

```text
本机：安装 [VSCode](https://code.visualstudio.com/download)（Remote-Containers 插件） + [Docker](https://www.docker.com/get-started) + [Nodejs](https://nodejs.org/)
```

### 2.1.2 远程开发

```text
本机：安装 VSCode（Remote-SSH 和 Remote-Containers 插件）
服务器：安装 Docker + [Nodejs](https://nodejs.org/)

注1：若你的服务器在公司的内网而无法 ssh 登陆。可以用开源的内网穿透工具：[frp](https://github.com/fatedier/frp)
注2：或者去各大公有云，已知aws和gcs目前可白嫖2个月。推荐选大陆以外的服务器，天然连通google，机器内存>8GB。
注3：目前还未适配低权限，请全部使用root权限操作。
```

## 2.2 环境构建

后文为了统一表述，这里请注意：

若你选择**本机开发**，那后文的**服务器**就是你个人使用的计算机，{server_ip} 就是 localhost；
若你选择**远程开发**，那后文的**服务器**就是你能 ssh 登陆的那台远程 server, {server_ip}就是其地址。

打开**服务器**的 terminal，

<!-- 📢若你等不及 pull 镜像，且本机已经有 npm，可以先跳过前 2 步，直接本机执行 npm init metacloud 操作

# pull 打包了各种好用工具的「瑞士军刀」镜像
docker pull oldwinter/uni-tools:latest

# 启动并进入 uni-tools 容器
docker run -it -v /home:/home -v /var/run/docker.sock:/var/run/docker.sock oldwinter/uni-tools zsh -->

```bash

# 根据提示，初始化项目，主要执行 git clone， docker build， docker run 等操作
npm init metacloud
```

完成后，根据 terminal 中的打印信息，获得{port}。打开**本机**的浏览器，查看前端界面：<http://{server_ip}:{port}> ，如果是本机开发，这个地址一般是<http://localhost:8000>。

## 2.3 启动开发

至此，基本的dev容器已经构建完成并运行，接下来我们探索细节。

<!-- 1. 通用工具型容器 uni-tools。推荐个人使用。里面有各种必备，高效，好玩的命令行工具，你可以考虑带着它去任意机器上玩耍，或者定制一个专属自己的工具型容器，其 dockerfile 位于 `uni-tools/.devcontainer/`。 -->

<!-- 2. 专属工程 devops 容器。推荐团队使用。里面封装好团队共同的开发工具和规范。并有一个小型的 docker in docker 以及 minikube（或者是docker from docker，并复用本机上的minikube）。在这一个容器里，就完全实现了开发改 1 行代码 ==> 10 秒上生产环境的全过程。其 dockerfile 位于 `.devcontainer/` -->

打开**服务器**terminal，

```bash
# 查看服务器已经构建且运行的 devcontainer
docker ps | grep meta

CONTAINER ID   IMAGE                   COMMAND                  CREATED         STATUS         PORTS                    NAMES
0ea65c34050c   mysql:8.0               "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:3306->3306/tcp   meta-dev-mysql
ce9e4d919166   devops_dev-server-toy   "/bin/sh -c 'pip3 in…"   7 minutes ago   Up 7 minutes   0.0.0.0:8002->8002/tcp   meta-dev-server-toy
6d34662783eb   redis:7.0-rc-bullseye   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:6379->6379/tcp   meta-dev-redis
33e1ed2b4489   devops_dev-server-gin   "/bin/sh -c 'go buil…"   7 minutes ago   Up 7 minutes   0.0.0.0:8001->8001/tcp   meta-dev-server-gin
546983007ace   devops_dev-portal       "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:8000->8000/tcp   meta-dev-portal

# 若选择了 devops 模式体验全工程，还会有一个尚未运行的镜像
docker images | grep vsc

REPOSITORY                                                TAG               IMAGE ID       CREATED             SIZE
vsc-metacloud-612dd3fcdc19c84c66941286bd4a8e42-features   latest            14ab39946ea3   18 hours ago        919MB

```

接着，若选择了**远程开发**，这里需要注意多做一步操作：
**本机**新打开一个 VSCode 窗口，
`shift+cmd+p` 打开 VSCode 命令控制台，输入`ssh :connect to host`，根据提示，完成连接操作即可。请自行搞定ssh连接免密码的问题。

后文为了统一表述，这里请注意：
若你选择了**本机开发**，后文的**服务器VSCode窗口**，就是你本机新开的一个VSCode窗口，
若你选择了**远程开发**，后文的**服务器VSCode窗口**，就是你通过上一步，已经SSH连接至服务器的窗口。

接着，分为 3 类，根据在上一节做的选择，按需选择 1 种继续操作。或者最好都玩一遍 😄。

### 2.3.1 纯前端开发

**本机**新打开一个**服务器VSCode窗口**，此处设其名为 A，

**ctrl+`** 打开 VSCode 内置 Terminal，

```bash

# 进入前端代码目录
cd metacloud/portal

# 安装依赖
npm i

# 启动 portal 开发
npm run dev

# ! 目前前端工程由于node_modules的存在，挂卷至容器，会造成较大性能问题，此处前端直接在server本地启动
```

完成后，根据提示，记端口为{port}。打开**本机**的浏览器，查看前端界面：<http://{server_ip}:{port}> 。改动一行代码感受一下浏览器刷新出新的界面的速度吧。

### 2.3.2 全栈开发

**本机**新打开一个**服务器VSCode窗口**，此处设其名为 B，

这时有2个选择，均可以：

1. `shift+cmd+p` 打开 VSCode 命令控制台，输入 `open folder in container`，选择metacloud工程根目录下的 `server/gin` 目录。此后，此时 VSCode 会默认销毁窗口 B，新建一个 C 窗口，此后这个 C 窗口，就是一个完全独立的微服务开发环境。

2. `shift+cmd+p` 打开 VSCode 命令控制台，输入 `attach to running container`，选择`/meta_server-gin`。此时 VSCode 会默认销毁窗口 B，新建一个窗口 D。此后这个 D 窗口，就是一个完全独立的微服务开发环境。

如要同时调测多个微服务，则再开多个**服务器VSCode窗口**，分别 attach 或 open in container，生出窗口 E,F ...。
做过后端开发的同学肯定熟悉 attach 这个词语，以前 debug 都是 attach 一个进程，现在对象换成了容器。
如果你以往深受改1行代码，弄到目标环境上调试却要花10分钟的痛苦折磨。你一定能体会到用这个方法后带来的极致 debug 体验🔥🚀。

接下来我们继续探索细节，简要分析 open in 和 attach 两种方式的特点和适用情况。

找到窗口B， **ctrl+`** 打开 VSCode 内置 Terminal，

```bash
# 通过 open in 方式打开的开发环境，会默认启动一个vsc前缀的容器，并且VSCode会自动做文件夹目录.devcontaienr所配置的挂卷安装相关的操作。一般用于持续开发。
docker ps |grep vsc

CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS
89cb454e895b   vsc-toy-08c6c6f809ce645b4ed2263a97524866               "/bin/sh -c 'echo Co…"   4 minutes ago    Up 3 minutes
8ce86db96f85   vsc-gin-78042bf5c69786c6e44bcf9fa3f417a6               "/bin/sh -c 'echo Co…"   5 minutes ago    Up 5 minutes
c05efb0498b4   vsc-portal-b285246c94dcc7d9bbd2b7f34f836be7-features   "/bin/sh -c 'echo Co…"   15 minutes ago   Up 7 minutes

# 通过 attach 方式进入到的开发环境，要初始化VSCode 相关配置，耗时较长，而且后续还需要自行做挂在volume等操作。一般用于临时debug。
docker ps | grep meta

CONTAINER ID   IMAGE                   COMMAND                  CREATED         STATUS         PORTS                    NAMES
ce9e4d919166   devops_dev-server-toy   "/bin/sh -c 'pip3 in…"   7 minutes ago   Up 7 minutes   0.0.0.0:8002->8002/tcp   meta-dev-server-toy
33e1ed2b4489   devops_dev-server-gin   "/bin/sh -c 'go buil…"   7 minutes ago   Up 7 minutes   0.0.0.0:8001->8001/tcp   meta-dev-server-gin
546983007ace   devops_dev-portal       "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:8000->8000/tcp   meta-dev-portal

```

这时候你应该已经能明显体会到：

> **一个窗口 ＝ 一个环境 ＝ 一个服务**

### 2.3.3 运维开发

> 这里目前需要科学上网，要访问谷歌（gcr）和微软（mcr.microsoft.com）自家的被墙的容器镜像仓库。

**本机**新打开一个**服务器VSCode窗口**，此处设其名为 Z，

`shift+cmd+p` 打开 VSCode 命令控制台，输入 `open folder in container`，选择metacloud工程根目录。

> 注：此时你处于一个devcontainer中，这个容器默认采用docker in docker 方案，也就是在容器里面，再安装一套docker，并安装minikube，istio

**ctrl+`** 打开 VSCode 内置 Terminal，

```bash

# 初始化安装运维开发环境 docker, minikube 和 istio
zx devops/scripts/install.mjs

# 构建全部微服务于「生产环境」使用的镜像
zx devops/scripts/build.mjs

# 发布构建产物：镜像，npm，brew 包等等
zx devops/scripts/publish.mjs

# 为 k8s 集群创建各类资源，部署微服务
zx devops/scripts/deploy.mjs

# 确保全部 pod 均正常 running 状态
kubectl get pod --all-namespaces -w

```

---

# 3. 整体架构

## 3.1 vscode + devcontainer 架构图

![开发流程图]()

## 3.2 微服务系统架构图

![系统架构图]()

## 3.3 目录结构

```bash

tree -a -d  -L 3 --dirsfirst --gitignore

    ├── devops
    │   ├── helm
    │   ├── portal
    │   ├── scripts
    │   ├── server
    │   ├── docker-compose.singledev.yaml
    │   ├── docker-compose.wholedev.yaml
    │   └── docker-compose.yaml
    ├── portal
    │   ├── public
    │   ├── src
    │   ├── Dockerfile
    │   ├── auto-imports.d.ts
    │   ├── components.d.ts
    │   ├── env.d.ts
    │   ├── index.html
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── tsconfig.json
    │   ├── tsconfig.vite-config.json
    │   └── vite.config.ts
    ├── server
    │   ├── gin
    │   └── toy
    ├── uni-tools
    │   ├── metacloud
    │   ├── scripts
    │   ├── README.md
    │   ├── index.js
    │   ├── package.json
    │   └── pnpm-lock.yaml
    ├── LICENSE
    └── README.md

```

---

# 4. 进阶玩法

- 修改。devcontainer 文件夹，定制团队一致的开发环境
- 在本机，用 iTerm2，批量连接所有开发环境
- 在线打开 github 直接开始开发
- 直接连接至生产环境的 k8s 中的 pod 进行 debug
- 在已有集群中，快速创建一个新的微服务
- 将现有业务，快速适配融合至本项目

---

# 5. 技术选择

## 5.1 为什么只用 VSCode + Docker

### 5.1.1 为什么是 VSCode

- 原生支持 devops in container，力度极大
- 开源、免费、轻量、好用。用户量第一，版本周更
- 插件机制，满足你的一切幻想，开发者的第二个操作系统

### 5.1.2 为什么是 Docker

- 基础架构即代码，和环境问题说 byebye
- 秒级启动，极致轻量。我个人 4U8G 的笔记本，可以运行一套 k8s，共 50+个容器
- 微服务化，devops，cloud native，有 docker 才有这一切

### 有什么劣势？

- 没有劣势，这就是未来 🐯

## 5.2 具体开源技术选型

- 前端：
  1. 基于 [Vue](https://vuejs.org)
  2. 使用组件库 [Element Plus](https://github.com/element-plus/element-plus) 构建基础页面
- 后端：拆分若干个微服务：
  1. 用 [traefik](https://github.com/traefik/traefik) 作为微服务网关
  2. 用 [Gin](https://gin-gonic.com/) 快速搭建基础 restful 风格 API，它是一个 [Go](https://go.dev) 语言编写的 Web 框架
  3. 用 [Python](https://www.python.org) 玩各种新技术的 demo
  4. 用 [Mysql](https://www.mysql.com/) 和 [Redis](https://redis.io/) 作为数据库中间件
- 运维&云原生：
  1. 用 [docker](https:www.docker.com) 进行微服务容器化封装
  2. 用 [kubernetes](https://kubernetes.io/) 进行容器集群化部署
  3. 用 [istio](https://istio.io) 进行集群服务网格化治理
  4. 用 [helm](https://helm.sh/) 进行 k8s 资源的包管理和部署，[docker-compose](https://docs.docker.com/compose/) 仅在开发阶段使用
- 构建脚本：
  1. 尝试不用 bash，改用现在很火的 [zx](https://github.com/google/zx) ，进行脚本编写。

---

# 6. 将来也许

- [x] 完成最小可行性版本，串通全流程
- [ ] 编写详细文档，阐述设计理念
- [ ] 尝试用 knative 实现 serverless
- [ ] 体验 openyurt 的边缘治理能力
- [ ] 完全上云版本，支持生产可用
- [ ] 践行云原生的工具栈和技术栈的融合思考

# 各大公有云简单对比

| 服务商  | ECS白嫖  | 是否需要外币卡 | 是否已用|
|---|---|---|---|
|阿里云| 1年2U2G1M 39元  | ||
|华为云|1年1U2G1M 39元||已经用了首年优惠|
|腾讯云|个人2个月免费| |已经用了免费体验2个月|
|AWS|企业用户12个月免费| 需要master或visa卡
|Azure|12个月免费|需要master或visa卡
|GCS||
