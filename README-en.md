```bash
docker pull node:12.22.10-bullseye
docker pull golang:1.18-rc-bullseye

docker run -d node:12.22.10-bullseye sleep infinity
docker run -d golang:1.18-rc-bullseye sleep infinity
```
# VSCode attach to 运行中的容器
打开VScode编辑器，cmd+P 输入 >attachToRunningContainer,选中需要开发代码的容器。等待执行完成后。


### 界面设计初稿
单项开发，or全栈开发
## 1，纯前端开发：

管理后台的界面
mock数据

## 2，全栈开发：
拆分成3个微服务：
1，api网关
2，成熟稳定的功能
3，测试各种新技术的demo
api管理（借助某个vscode插件？实在不行就swagger。一定要使用开源，不用商业软件)

## 3， 运维开发：
### 3，加入K8S部署后：
引入一个网关微服务，解耦
界面支持k8s相关管理，查一下比iframe更好的技术

### 4，加入istio运维监控后：
界面支持istio相关管理，查一下比iframe更好的技术




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

#### 云上类生产/生产环境

可以采用云服务商提供的定制化应用及资源编排服务，完成自动化部署和运维。
但我们的原则是，一切皆开源，且不被运营商强绑定。
所以更优的选择是，通过它们提供的 console 控制台，手动进行各个资源的开通和对接即可。

应用上云极简教程（新手向）
以阿里云为例（新人，最低配置的价格）：

1. 购买弹性云服务器，39 元 1 年 2U4G：
   ssh 登陆已购服务器，并完整进行一遍 [小型开发环境 or 测试环境：]() 步骤即可。唯一不同点是，你的云上机器开放了公网访问，可以被全网用户访问到。

2. 可选，购买域名，9 元 1 年：
3. 可选，创建云解析 dns，免费：
4. 可选，随着业务量上升，单台 ECS 很快会成为业务瓶颈，此时最优选择就是购买云平台的各个服务：k8s 集群，对象存储服务，数据库服务，消息队列服务，CDN 服务。
   此时微服务化的优势凸显，哪个业务是瓶颈，就在云上，弹性扩充某个资源即可。
   云原生的优势凸显，可以方便地按需拔插新业务，例如对接云平台提供的 AI&大数据，运维&安全等等新业务。

<!-- TODO:  -->

此处涉及到云服务 console 控制台的使用，文字难以一言以蔽之，计划录一个视频。
