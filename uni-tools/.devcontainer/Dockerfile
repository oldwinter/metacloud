#https://hub.docker.com/_/ubuntu
FROM ubuntu:20.04 
LABEL OWNER="oldwinter"

WORKDIR /tmp
VOLUME [ "/data" ]

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
        apt-utils \
        locales \
    # 自动跳过各种选时区的界面，locales需要先安装
    && dpkg-reconfigure -f noninteractive locales \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y  --no-install-recommends \
    sudo curl git zsh \
    tree wget vim tldr \
    speedtest-cli \
    net-tools iputils-ping \
    # nodejs的东西维护在自己的仓库里，这里官方脚本规定死了17+版本，以后记得手动改
    && curl -fsSL https://deb.nodesource.com/setup_17.x | bash - \
    && DEBIAN_FRONTEND=noninteractive  apt-get install -y --no-install-recommends  nodejs \
    # 清理现场，精简镜像layer
    && apt-get -y autoclean \ 
    && rm -rf /var/lib/apt/lists/*

### 👇🏻安装npm常用工具
# zx: 用js写bash脚本
# cnpm，yarn 有时可能会用到
# http-server，快速启动一个简易webserver做测试用
RUN npm i -g zx cnpm yarn http-server

### 👇🏻安装homebrew以及brew仓库里常用工具
# 添加admin用户    
RUN useradd --create-home --no-log-init --shell /bin/bash admin \
    && adduser admin sudo \
    && echo 'admin:admin' | chpasswd

USER admin

# homebrew只支持非root 用户安装
# fzf: 找文件神器
# thefuck：自动纠错上条命令并执行 
# kubectl：先装上再说，永远会有k8s集群待你去连接
# kubectx: 切换集群和namespace，多集群管理好用得飞起
RUN git clone https://github.com/Homebrew/brew /home/admin/homebrew \
    && eval "$(/home/admin/homebrew/bin/brew shellenv)" \
    && update --force --quiet \
    && chmod -R go-w "$(brew --prefix)/share/zsh" \
    && brew install fzf \
    && brew install thefuck \
    && brew install kubectl \
    && brew install kubectx 

USER root

### 👇🏻oh my zsh 内置了shell主题，z 命令，自动补全和各种充满想象力的小东西
RUN echo y | bash -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)" \
    sed -i 's/plugins=(git)/plugins=(git z extract zsh-autosuggestions zsh-syntax-highlighting kubectl docker)/g' ~/.zshrc


### 👇🏻安装docker的命令行工具，不安装daemon
# Install Docker CE CLI and docker-compose CLI 社区版的docker还没内置compose命令，还需要额外装个docker-compose
RUN apt-get update \
    && apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release \
    && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
    && echo "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \

    && apt-get install -y docker-ce-cli \
    && LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")') \
    && curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

SHELL [ "zsh" ]