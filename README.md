<div align=center>
<img src="https://img.shields.io/badge/golang-1.16-blue"/>
<img src="https://img.shields.io/badge/gin-1.6.3-lightBlue"/>
<img src="https://img.shields.io/badge/vue-3.0.0-brightgreen"/>
<img src="https://img.shields.io/badge/element--plus-1.1.0beta8-green"/>
<img src="https://img.shields.io/badge/gorm-1.20.7-red"/>
</div>

[English](./README-en.md) | 简体中文

# 项目文档
[在线文档](https://doc.oldwinter.com) : https://doc.oldwinter.com

## 1. 基本介绍

### 1.1 项目介绍

> MetaCloud复杂又简单：基于 [vue](https://vuejs.org) 和 [gin](https://gin-gonic.com) 开发的全栈前后端分离的开发基础平台。
> 平台采用 [docker](https:www.docker.com) 进行微服务容器化封装，采用 [kubernetes](https://kubernetes.com) 进行容器集群化部署，
> 平台采用 [istio]() 进行集群服务网格化治理

[在线预览](https://demo.oldwinter.com): https://demo.oldwinter.com

测试用户名：admin 测试密码：123456

## 2. 使用说明

```
开发配置：VSCode + Docker 。真正DevOps with Docker
```
# 安装软件
安装vscode 编辑器 Remote-Containers插件
安装docker 

# 拉取docker官方镜像并运行

打开MetaCloud.code-workspace工作空间

```bash
docker pull node:12.22.10-bullseye
docker pull golang:1.18-rc-bullseye

docker run -d node:12.22.10-bullseye sleep infinity
docker run -d golang:1.18-rc-bullseye sleep infinity
```

# VSCode attach to 运行中的容器
打开VScode编辑器，cmd+P 输入 >attachToRunningContainer,选中需要开发代码的容器。等待执行完成后。

### 2.1 前端portal工程
打开前端server工程的vscode窗口，并打开其内置terminal

```bash
git clone https://github.com/oldwinter/MetaCloud.git

# 进入portal文件夹
cd portal

# 安装依赖
npm install

# 启动portal项目
npm run serve
```
### 2.2 后端server工程
打开后端server工程的vscode窗口，并打开其内置terminal

```bash
git clone https://github.com/oldwinter/MetaCloud.git
# 进入server文件夹
cd server

# 使用 go mod 并安装go依赖包
go generate

# 编译 
go build -o server main.go (windows编译命令为go build -o server.exe main.go )

# 运行二进制
./server (windows运行命令为 server.exe)
```


### 2.3 swagger自动化API文档

#### 2.3.1 安装 swagger

##### （1）可以访问外国网站

````
go get -u github.com/swaggo/swag/cmd/swag
````

##### （2）无法访问外国网站

由于国内没法安装 go.org/x 包下面的东西，推荐使用 [goproxy.cn](https://goproxy.cn) 或者 [goproxy.io](https://goproxy.io/zh/)

```bash
# 如果您使用的 Go 版本是 1.13 - 1.15 需要手动设置GO111MODULE=on, 开启方式如下命令, 如果你的 Go 版本 是 1.16 ~ 最新版 可以忽略以下步骤一
# 步骤一、启用 Go Modules 功能
go env -w GO111MODULE=on 
# 步骤二、配置 GOPROXY 环境变量
go env -w GOPROXY=https://goproxy.cn,https://goproxy.io,direct

# 如果嫌弃麻烦,可以使用go generate 编译前自动执行代码, 不过这个不能使用 `Goland` 或者 `Vscode` 的 命令行终端
cd server
go generate -run "go env -w .*?"

# 使用如下命令下载swag
go get -u github.com/swaggo/swag/cmd/swag
```

#### 2.3.2 生成API文档

```` shell
cd server
swag init
````

> 执行上面的命令后，server目录下会出现docs文件夹里的 `docs.go`, `swagger.json`, `swagger.yaml` 三个文件更新，启动go服务之后, 在浏览器输入 [http://localhost:8888/swagger/index.html](http://localhost:8888/swagger/index.html) 即可查看swagger文档


## 3. 技术选型

- 前端：用基于 [Vue](https://vuejs.org) 的 [Element](https://github.com/ElemeFE/element) 构建基础页面。
- 后端：用 [Gin](https://gin-gonic.com/) 快速搭建基础restful风格API，[Gin](https://gin-gonic.com/) 是一个go语言编写的Web框架。
- 数据库：采用`MySql`(5.6.44)版本，使用 [gorm](http://gorm.cn) 实现对数据库的基本操作。
- 缓存：使用`Redis`实现记录当前活跃用户的`jwt`令牌并实现多点登录限制。
- API文档：使用`Swagger`构建自动化文档。
- 配置文件：使用 [fsnotify](https://github.com/fsnotify/fsnotify) 和 [viper](https://github.com/spf13/viper) 实现`yaml`格式的配置文件。
- 日志：使用 [zap](https://github.com/uber-go/zap) 实现日志记录。

## 4. 项目架构

### 4.1 系统架构图

![系统架构图](http://qmplusimg.henrongyi.top/gva/gin-vue-admin.png)

### 4.2 目录结构

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
    
    └─web            （前端文件）
        ├─public        （发布模板）
        └─src           （源码包）
            ├─api       （向后台发送ajax的封装层）
            ├─assets	（静态文件）
            ├─components（组件）
            ├─router	（前端路由）
            ├─store     （vuex 状态管理仓）
            ├─style     （通用样式文件）
            ├─utils     （前端工具库）
            └─view      （前端页面）

```

# 基本介绍

包含部分：
- 基于开源，实现编程自由
- 通过软件，实现
- 通过阅读，
- 通过电影，实现
- 编程云原生，人生云原生
- 10年双拼使用经验

纷杂程序世界里，一个就够了。

如何自己从0到1，搭建出自己的。
1，始于开源，忠于开源。
项目中全部的东西，均来源于开源。
2，

每一块积木，都是，我会基于这几点分析：为什么是它？
它的优势是什么？
劣势

会定时刷新最近的技术栈，

