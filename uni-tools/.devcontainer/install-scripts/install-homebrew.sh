# 清华镜像站：https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
/bin/bash -c "$(curl -fsSL https://github.com/Homebrew/install/raw/HEAD/install.sh)"
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
test -r ~/.bash_profile && echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bash_profile
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.profile

# fzf: 找文件神器
# thefuck：自动纠错上条命令并执行 
# kubectl：先装上再说，永远会有k8s集群待你去连接
# kubectx: 切换集群和namespace，多集群管理好用得飞起
/home/linuxbrew/.linuxbrew/bin/brew  install fzf 
/home/linuxbrew/.linuxbrew/bin/brew  install thefuck 
/home/linuxbrew/.linuxbrew/bin/brew  install kubectl 
/home/linuxbrew/.linuxbrew/bin/brew  install kubectx 

brew cleanup