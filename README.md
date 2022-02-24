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

### 2.1.1 本机开发

本机安装 [VSCode](https://code.visualstudio.com/download)（Remote-Containers 插件） + [Docker](https://www.docker.com/get-started) + 科学上网

<!--
### 2.1.2 远程开发

```text
本机：安装 VSCode（Remote-SSH 和 Remote-Containers 插件）
服务器：安装 Docker + 科学上网
``` -->

## 2.2 环境构建

打开本机 terminal，

<!-- 📢如果你等不及 pull 镜像，且本机已经有 npm，可以先跳过前 2 步，直接本机执行 npm init metacloud 操作

# pull 打包了各种好用工具的「瑞士军刀」镜像
docker pull oldwinter/uni-tools:latest

# 启动并进入 uni-tools 容器
docker run -it -v /home:/home -v /var/run/docker.sock:/var/run/docker.sock oldwinter/uni-tools zsh -->

```bash

# 根据提示，初始化项目，主要执行 git clone， devcontainer build 等操作
npm init metacloud
```

## 2.3 启动开发

完成上一节后。本机应该已经有了 1 个容器镜像，后续步骤将会默认启动：

<!-- 1. 通用工具型容器 uni-tools。推荐个人使用。里面有各种必备，高效，好玩的命令行工具，你可以考虑带着它去任意机器上玩耍，或者定制一个专属自己的工具型容器，其 dockerfile 位于 `uni-tools/.devcontainer/`。 -->

2. 专属工程 devops 容器。推荐团队使用。里面封装好团队共同的开发工具和规范。并有一个小型的 docker in docker 以及 minikube（或者是docker from docker，并复用本机上的minikube）。在这一个容器里，就完全实现了开发改 1 行代码-->10 秒上生产环境的全过程。其 dockerfile 位于 `.devcontainer/`

打开本机 terminal，

```bash
# 查看本机已经构建出的devcontainer
docker images | grep vsc

> vsc-metacloud-612dd3fcdc19c84c66941286bd4a8e42-features   latest    14ab39946ea3   18 hours ago   919MB

# 


```

接下来分为 3 类，根据在上一节做的选择，按需选择 1 种继续操作。或者最好都玩一遍 😄。

### 2.3.1 纯前端开发

本机开一个 VSCode 窗口，此处设其名为 A，

`shift+cmd+p` 打开 VSCode 命令控制台，输入 `open folder in container`，选择根目录下的 `portal/` 目录。

此后，这个 A 窗口，就是一个完全独立的前端开发环境。

**shift+ctrl+`** 打开 VSCode 内置 Terminal，

```bash
# 安装依赖
npm i

# 启动 portal 开发
npm run dev

# ! 目前前端工程由于node_modules的存在，挂卷进来会造成较大性能问题，此处仅做预览使用。更推荐前端等nodejs工程不要将主机上的git工程挂卷进来，而是容器内单独git clone一个进行开发。
```

### 2.3.2 全栈开发

本机开一个 VSCode 窗口，此处设其名为 B，

**shift+ctrl+`** 打开 VSCode 内置 Terminal，

```bash

# https://docs.docker.com/engine/reference/commandline/inspect/
docker inspect 5bd --format "{{json .Mounts}}{{.type}}"

# 获取主机上工程目录，挂卷至容器中

export LOCAL_WORKSPACE_FOLDER=`pwd`

cd devops/

#启动全部 devcontainer（默认执行 container 中的服务启动脚本）
docker-compose up -d

docker ps -a |grep meta
> 
```

`shift+cmd+p` 打开 VSCode 命令控制台，输入 attach to running container，按需选择待开发的微服务即可。此时 VSCode 会默认销毁窗口 B，新建一个窗口 C。如要同时调测多个微服务，则再开多个 VSCode 窗口，分别 attach 或 open in container，生出窗口 D,E...

这时候你应该已经能明显体会到：

> **一个窗口 ＝ 一个开发环境 ＝ 一个微服务**

### 2.3.3 运维开发

本机开一个 VSCode 窗口，此处设其名为 Z，

`shift+cmd+p` 打开 VSCode 命令控制台，输入 `open folder in container`，选择根目录。

**shift+ctrl+`** 打开 VSCode 内置 Terminal，

```bash
# 初始化安装运维开发环境 docker, minikube 和 istio
zx devops/scripts/install.mjs

# 构建全部微服务生产环境使用的镜像
zx devops/scripts/build.mjs --local

# 发布构建产物：镜像，npm，brew 包等等
zx devops/scripts/publish.mjs

# 为 k8s 集群创建各类资源，部署微服务
zx devops/scripts/deploy.mjs

# 确保全部 pod 均正常 running 状态
kubectl get pod --all-namespaces

```

---

# 3. 整体架构

## 3.1 vscode + devcontainer 架构图

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.2 微服务系统架构图

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.3 目录结构

```bash
    ├── server
        ├── api             (api 层）
        │   └── v1          (v1 版本接口）

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
