<p align="center">
  <a href="https://ant.design">
     <!-- TODO -->
    <img width="200" src="./docs/1024x1024.png">
  </a>
</p>

<h1 align="center">MetaCloud</h1>

<div align="center">
    <img src="https://img.shields.io/badge/golang-1.16-blue"/>
</div>

<!-- TODO: -->

---

[English](./README-en.md) | 简体中文

# 1. 基本介绍

## 1.1 项目介绍

> MetaCloud，是工具，也是方法论：
> 作为工具，它教你只通过 VSCode + docker + cloud，无痛地开发一切。
> 作为方法论，它将开源社区「最新的思想」和「最热的项目」，融合到工具中，且所见即所得。

## 1.2 项目文档

<!-- [在线文档](https://doc.oldwinter.com) : <https://doc.oldwinter.com> -->
TODO

## 1.3 项目预览

[在线预览](https://demo.oldwinter.com): <https://demo.oldwinter.com>

<!-- ![系统架构图](http://.png) -->

## 1.4 项目特点

- 面向开源社区开发：不造轮子，全部基于开源项目缝合，且只选最新、最酷、最热门的项目
- 面向云原生开发：要实现cloud native，先实现contaier native，顺便完成service mesh和devops
- 背对云平台开发：使用云却不被任何云绑定，万花丛中过，片叶不沾身

---

# 2. 快速开始

## 2.1 软件安装

### 2.1.1 本机开发

```text
本机：安装 VSCode（Remote-Containers 插件） + Docker + 科学上网
```
<!-- 
### 2.1.2 远程开发

```text
本机：安装 VSCode（Remote-SSH 插件）
服务器：安装 Docker + 科学上网
``` -->



## 2.2 环境构建

本机打开一个 VSCode 窗口，此处将其命名为admin-code
<!-- 如果是远程开发，这里需要多执行一步：
`shift+cmd+p` 打开 VSCode 命令控制台,输入 `connect current window to host`，根据提示，远程连接至你已经装好docker的服务器。 -->
**shift+ctrl+`** 打开VSCode 内置 Terminal，

```bash
git clone https://github.com/oldwinter/MetaCloud.git
```

`shift+cmd+p` 打开 VSCode 命令控制台,输入 `reopen in container`，进行开发container环境启动。第一次需要构建，取决于你的网络和机器性能，耗时分钟级，此后秒级启动。

此后，你的这个VSCode窗口，就是一个和你本机无关的独立开发环境，尽情造作放肆吧。

## 2.3 启动开发

接下来分为 3 类，按需选择 1 种即可。

### 2.3.1 纯前端开发

本机新开一个 VSCode 窗口，此处将其命名为portal-code
`shift+cmd+p` 打开 VSCode 命令控制台,输入 `open folder in container`，选择根目录下的 portal 目录。这里同样要构建一个用于前端开发独享的开发container，故第一次需要构建。

此后，你的这个portal-code窗口，就是一个完全独立的前端开发环境。

**shift+ctrl+`** 打开VSCode 内置 Terminal，

```bash
# 安装依赖
npm i

# 启动 portal 开发
npm run dev
```

### 2.3.2 全栈开发

找到admin-code窗口

**shift+ctrl+`** 打开VSCode VSCode 内置 Terminal，

```bash
//启动全部 dev container（默认启动container中的进程），第一次构建分钟级耗时
docker compose up -f docker-compose.yaml
```

**shift+cmd+p** 打开 VSCode 命令控制台,输入 attach to running container，按需选择待开发的微服务即可。

这时候你应该已经能明显体会到：

**一个VSCode窗口 ＝ 一个开发环境**

### 2.3.3 运维开发

以本机部署为例（理论上至少需要 8GB 以上内存）：

- 安装 kubernetes
- 安装 istio
以上两步，图形界面以外的操作，全部在你admin-code窗口中实现即可。
参考[本机安装 k8s 和 istio](https://github.com/AliyunContainerService/k8s-for-docker-desktop)

安装完成后：
找到admin-code窗口
**shift+ctrl+`** 打开VSCode 内置 Terminal，

```bash
# 构建 微服务镜像
zx docker-build.mjs --local

# 为k8s集群创建各类资源
zx cluster-oper.mjs --create
```

---

# 3. 整体架构

## 3.1 vscode数据流

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.2 系统架构图

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.3 目录结构

```bash
    ├── server
        ├── api             (api 层）
        │   └── v1          (v1 版本接口）

```

---

# 4. 进阶玩法

- 修改devcontainer文件夹，定制团队一致的开发环境
- 在本机，用iTerm2，批量连接所有开发环境
- 在线打开github直接开始开发
- 直接连接至k8s的pod进行开发
- 在已有集群中，快速创建一个新的微服务
- 将现有业务，快速适配融合至本项目
  
---

# 5. 技术选择

## 5.1 为什么只用 VSCode + docker

### 为何只使用 VSCode 完成？

- 原生支持 devops in container
- 免费、轻量、好用
- 用户量第一，版本周更新
- 插件机制，满足你的一切幻想

### 为何完全在 docker 中开发？

- 基础架构即代码，和环境问题说byebye
- cloud native，从Coding阶段抓起
- 微服务化，devops，无痛上云，docker全搞定
  
### 有什么劣势？

- 没有劣势，这就是未来🐯

## 5.2 具体开源技术选型

- 前端：用基于 [Vue](https://vuejs.org) 的 [Element Plus](https://github.com/element-plus/element-plus) 构建基础页面
- 后端：拆分若干个微服务：
  1. 用 [kong](https://konghq.com) 作为微服务网关
  2. 用 [Gin](https://gin-gonic.com/) 快速搭建基础 restful 风格 API，它是一个 [Go](https://go.dev) 语言编写的 Web 框架
  3. 用 [Python](https://www.python.org) 玩各种新技术的 demo
  4. 用 [Mysql] 
- 运维&云原生：
  1. 用 [docker](https:www.docker.com) 进行微服务container化封装
  2. 用 [kubernetes](https://kubernetes.io/) 进行container集群化部署
  3. 用 [istio](https://istio.io) 进行集群服务网格化治理
- 构建脚本：
  1. 尝试不用bash，改用现在很火的 [zx](https://github.com/google/zx) ，进行全过程脚本编写。

---

# 5. 将来也许

- [x] 完成最小可行性版本，串通全流程
- [ ] 编写详细文档，阐述设计理念
- [ ] 完全上云版本，支持生产可用
