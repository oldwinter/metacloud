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

