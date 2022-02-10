<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">MetaCloud</h1>

<div align="center">
    <img src="https://img.shields.io/badge/golang-1.16-blue"/>
</div>

<!-- TODO: -->
[English](./README-en.md) | 简体中文

# 1. 基本介绍

## 1.1 项目介绍
> MetaCloud，是工具，也是方法论：
> 作为工具，它只通过vscode + docker + cloud，无痛地开发。
> 作为方法论，它将开源社区最新的思想和最热门的项目，融合到工具中，且所见即所得。

## 1.2 项目文档
[在线文档](https://doc.oldwinter.com) : https://doc.oldwinter.com

## 1.3 项目预览：
[在线预览](https://demo.oldwinter.com): https://demo.oldwinter.com

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 1.4 项目理念：
1，不造轮子，基于开源项目缝合，覆盖软件研发全部生命周期
2，微服务，云原生，devops，
3，微服务可插拔，不绑定任何云平台。

# 2. 快速开始

## 2.1 软件安装
```
开发配置：VSCode（Remote-Containers插件） + Docker + 科学上网。真正DevOps with Docker
```

## 2.2 环境构建
打开vscode，打开内置terminal
```
git 
```
双击打开MetaCloud.code-workspace工作空间，vscode界面最左脚点击，选择reopen in container，（第一次需要构建，取决于你的网络和机器性能，耗时分钟级，此后秒级启动）
一段时间过后~~~
在新的ubuntu容器开发环境中，折腾一切吧，此时你做的一些，都与你自己的计算机无关!

## 2.3 启动开发
接下来分为3类，按需选择1种即可。
### 2.3.1 前端开发
vscode界面最左脚点击，选择open folder in container，选择根目录下的portal目录（第一次需要构建，取决于你的网络和机器性能，耗时分钟级，此后秒级启动）

```bash
git clone https://github.com/oldwinter/MetaCloud.git

# 进入portal文件夹
cd portal

# 安装依赖
npm install

# 启动portal项目
npm run serve
```

默认采用本地mock数据，如果你已经有一个同网络的可用后端地址，在xx文件中修改即可。

### 2.3.2 全栈开发

docker-compose up启动全部dev容器（默认启动容器中的服务），（第一次需要构建，取决于你的网络和机器性能，耗时分钟级，此后秒级启动）
然后需要开发哪个微服务，使用vscode的attach to running container 即可。


### 2.3.3 运维开发
#### 本地开发环境
以自用计算机部署为例（理论上至少需要8GB以上内存）：
1，安装docker desktop自带的kubernetes
2，安装istio，并使用istioctl命令安装配套业务
3，使用kubectl命令，创建全部微服务及配套资源。
安装docker、k8s和istio：
        5，clone 业务代码并用kubectl命令进行部署：
访问前端界面：localhost:8000，判断业务是否成功部署，并进行持续监控。

#### 云上类生产/生产环境：
可以采用云服务商提供的定制化应用编排服务，完成自动化部署和运维。但我们的原则是，一切皆开源，且不被运营商强绑定。
所以通过他们提供的console控制台，手动进行各个资源的开通和对接即可。

应用上云极简教程（新手向）
    以阿里云为例（新人，最低配置的价格）：
    1，购买域名，9元1年：
    2，创建云解析dns，免费：
    3，购买弹性云服务器，39元1年2U4G：
        ssh登陆已购服务器，并完整进行一遍 [小型开发环境or测试环境：]() 步骤即可。唯一不同点是，你的云上机器开放了公网访问，可以被全网用户访问到。
    4，（可选）随着业务量上升，单台ECS很快会成为业务瓶颈，此时最优选择就是购买云平台的各个服务：k8s集群，对象存储服务，数据库服务，消息队列服务，CDN服务。
        此时微服务化的优势凸显，哪个业务是瓶颈，就在云上，弹性扩充某个资源即可。
        云原生的优势凸显，可以方便地按需拔插新业务，例如对接云平台提供的AI&大数据，运维&安全等等新业务。

TODO: 此处涉及到云服务console控制台的使用，文字难以一言以蔽之，计划录一个视频。









# 3. 整体架构

## 3.1 架构图
![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

## 3.3 目录结构
```
    ├── server
        ├── api             (api层)
        │   └── v1          (v1版本接口)
        ├── config          (配置包)
        ├── core            (核心文件)
        ├── docs            (swagger文档目录)
        ├── global          (全局对象)                    
        ├── initialize      (初始化)                        
        │   └── internal    (初始化内部函数)                            
        ├── middleware      (中间件层)                        
        ├── model           (模型层)                    
        │   ├── request     (入参结构体)                        
        │   └── response    (出参结构体)                            
        ├── packfile        (静态文件打包)                        
        ├── resource        (静态资源文件夹)                        
        │   ├── excel       (excel导入导出默认路径)                        
        │   ├── page        (表单生成器)                        
        │   └── template    (模板)                            
        ├── router          (路由层)                    
        ├── service         (service层)                    
        ├── source          (source层)                    
        └── utils           (工具包)                    
            ├── timer       (定时器接口封装)                        
            └── upload      (oss接口封装)                       

```

# 4. 技术选型
## 4.1 为什么只用vscode + docker

## 为何全部的开发过程均使用vscode编辑器完成？
1，因为vscode原生支持devops in container。
2，用户规模和市场即一切，你使用过程中遇到的一切问题，基本都可以谷歌到，用其他软件可不一定了。
3，

## 为何全部的环境都使用docker进行开发？
因为要cloud native，基础架构即代码。
开发，测试，部署，运维，全部都是同一套环境的复刻！出问题你只需要分析外部条件即可。
用上这个模式以后，你会发现，软件开发全部阶段，都是可以弹性伸缩的。
比如你团队来了一个新人，装环境花半天？现在，你只需要1杯咖啡的工夫，新人的开发环境，和你就是完全一致的了，让那些不同环境产生的问题，见鬼去吧。
## 4.2 具体开源技术选型
- 前端：用基于 [Vue](https://vuejs.org) 的 [Element Plus](https://github.com/element-plus/element-plus) 构建基础页面。
- 后端：拆分为3个微服务，1：用 [kong](https://konghq.com) 作为微服务网关。 2.用 [Gin](https://gin-gonic.com/) 快速搭建基础restful风格API，它是一个 [Go](https://go.dev) 语言编写的Web框架。3.用 [Python](https://www.python.org) 玩各种新技术的demo。
- 运维&云原生：用 [docker](https:www.docker.com) 进行微服务容器化封装，用 [kubernetes](https://kubernetes.io/) 进行容器集群化部署，用 [istio](https://istio.io) 进行集群服务网格化治理。

# 5. 除此之外
以上整个工程，是关于只用vscode + docker写代码的故事。
此处挖个坑，待填。


