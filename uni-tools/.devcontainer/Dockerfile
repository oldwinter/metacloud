#https://hub.docker.com/_/ubuntu
FROM ubuntu:20.04 

LABEL OWNER="oldwinter"

WORKDIR /home

### 👇🏻用apt包管理系统，安装系统级linux常用工具
# apt-get 官方文档： https://linux.die.net/man/8/apt-get
# net-tools: netstat ifconfig
# iputils-ping: ping
# tldr: 迅速知道如何使用某命令
# speedtest: 测网速
RUN apt-get update  \
    # 取消所有安装命令的交互,取消所有推荐包的安装
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    # 包含了一些模板，必装，后面就会自动用模板配置软件
    apt-utils locales \
    # 自动跳过各种选时区的界面，locales需要先安装
    && dpkg-reconfigure -f noninteractive locales \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    sudo curl git zsh \
    tree wget vim tldr \
    speedtest-cli \
    net-tools iputils-ping iptables \
    # nodejs的东西维护在自己的仓库里，这里官方脚本规定死了17+版本，以后记得手动改
    && curl -fsSL https://deb.nodesource.com/setup_17.x | bash - \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends  nodejs \
    # 清理现场，精简镜像layer
    && apt-get -y autoclean \ 
    && rm -rf /var/lib/apt/lists/*

### 👇🏻安装npm常用工具
# zx: 用js写bash脚本
# yarn 有时可能会用到
# http-server，快速启动一个简易webserver做测试用
RUN npm i -g zx yarn http-server

### 👇🏻前者是多个文件时，后者末尾要加/才表示copy整个文件夹到目录下
COPY install-scripts/* ./install-scripts/

### 👇🏻oh my zsh 内置了shell主题，z 命令，自动补全和各种充满想象力的小东西
RUN bash install-scripts/install-ohmyzsh.sh

### 👇🏻安装docker的命令行工具，不安装daemon
# Install Docker CE CLI and docker-compose CLI 社区版的docker还没内置compose命令，还需要额外装个docker-compose
RUN bash install-scripts/install-docker.sh

### 👇🏻homebrew 官方只支持非root 用户安装，速度很慢，装完后超过500MB占用，考虑不装它，这里用清华的镜像站
# RUN bash install-scripts/install-homebrew.sh
    
VOLUME [ "/data" ]

SHELL [ "zsh" ]