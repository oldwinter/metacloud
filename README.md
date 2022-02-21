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
> 作为方法论，它将开源社区「最新的思想」和「最热门的项目」，融合到工具中，且所见即所得。

## 1.2 项目文档

[在线文档](https://doc.oldwinter.com) : <https://doc.oldwinter.com>

## 1.3 项目预览

[在线预览](https://demo.oldwinter.com): <https://demo.oldwinter.com>

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 1.4 项目特点

- 不造轮子，基于开源项目缝合，覆盖软件研发全部生命周期
- 微服务，云原生，devops
- 可插拔，不被任何云平台强绑定

# 2. 快速开始

## 2.1 软件安装

接下来分为 2 类，按需选择 1 种即可。
### 2.1.1 本机开发
```text
本机：安装 VSCode（Remote-Containers 插件） + Docker + 科学上网
```
### 2.1.2 远程开发
```text
本机：安装 VSCode（Remote-SSH 插件）
服务器：安装 Docker + 科学上网
```

---

## 2.2 环境构建

本机打开 VSCode ，如果是远程开发，这里需要多执行一步：
`shift+cmd+p` 打开 VSCode 命令控制台,输入 `connect current window to host`，根据提示，远程连接至你已经装好docker的服务器。

**shift+ctrl+`** 打开VSCode 内置 Terminal，

```bash
git clone https://github.com/oldwinter/MetaCloud.git
```

`shift+cmd+p` 打开 VSCode 命令控制台,输入 `reopen in container`，进行开发容器环境启动。第一次需要构建，取决于你的网络和机器性能，耗时分钟级，此后秒级启动。

## 2.3 启动开发

接下来分为 3 类，按需选择 1 种即可。

### 2.3.1 纯前端开发

`shift+cmd+p` 打开 VSCode 命令控制台,输入 `reopen folder in container`，进行开发容器环境启动，选择根目录下的 portal 目录。这里同样要构建一个用于前端开发独享的开发容器，故第一次需要构建。

**shift+ctrl+`** 打开VSCode 内置 Terminal，
```bash
# 安装依赖
npm i

# 启动 portal 开发
npm run  dev
```

### 2.3.2 全栈开发

`cmd+\` 打开VSCode VSCode 内置 Terminal，

```bash
//启动全部 dev 容器（默认启动容器中的服务），第一次构建分钟级耗时
docker-compose up -f docker-compose-dev.yaml
```
**shift+cmd+p** 打开 VSCode 命令控制台,输入 attach to running container，按需选择待开发的服务即可。

### 2.3.3 运维开发

#### 本地开发环境

以自用计算机部署为例（理论上至少需要 8GB 以上内存）：
- 安装 docker desktop 自带的 kubernetes
- 安装 istio，并使用 istioctl 命令安装配套业务
以上两步，参考[本机安装 k8s 和 istio](https://github.com/AliyunContainerService/k8s-for-docker-desktop) 即可实现。

```bash
//构建生产环境用的微服务容器镜像

//将微服务部署至k8s数据面
kubectl get pod 

```

---

# 3. 整体架构

## 3.1 vscode数据流

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.2 系统架构图

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.3 目录结构

```
    ├── server
        ├── api             (api 层）
        │   └── v1          (v1 版本接口）
        ├── config          （配置包）
        ├── core            （核心文件）
        ├── docs            (swagger 文档目录）
        ├── global          （全局对象）
        ├── initialize      （初始化）
        │   └── internal    （初始化内部函数）
        ├── middleware      （中间件层）
        ├── model           （模型层）
        │   ├── request     （入参结构体）
        │   └── response    （出参结构体）
        ├── packfile        （静态文件打包）
        ├── resource        （静态资源文件夹）
        │   ├── excel       (excel 导入导出默认路径）
        │   ├── page        （表单生成器）
        │   └── template    （模板）
        ├── router          （路由层）
        ├── service         (service 层）
        ├── source          (source 层）
        └── utils           （工具包）
            ├── timer       （定时器接口封装）
            └── upload      (oss 接口封装）

```

---

# 4. 技术选择

## 4.1 为什么只用 VSCode + docker
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

## 4.2 具体开源技术选型

- 前端：用基于 [Vue](https://vuejs.org) 的 [Element Plus](https://github.com/element-plus/element-plus) 构建基础页面
- 后端：拆分为 3 个微服务：
  1. 用 [kong](https://konghq.com) 作为微服务网关
  2. 用 [Gin](https://gin-gonic.com/) 快速搭建基础 restful 风格 API，它是一个 [Go](https://go.dev) 语言编写的 Web 框架
  3. 用 [Python](https://www.python.org) 玩各种新技术的 demo
- 运维&云原生：
  1. 用 [docker](https:www.docker.com) 进行微服务容器化封装
  2. 用 [kubernetes](https://kubernetes.io/) 进行容器集群化部署
  3. 用 [istio](https://istio.io) 进行集群服务网格化治理
- 构建脚本：
  1. 尝试不用bash，改用现在很火的 [zx](https://github.com/google/zx) ，进行全过程脚本编写。

---
# 5. 将来也许
- [x] 完成最小可行性版本，串通全流程
- [ ] 编写详细文档，阐述设计理念
- [ ] 完全上云版本，支持生产可用

