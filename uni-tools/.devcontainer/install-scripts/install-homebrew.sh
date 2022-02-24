# 清华镜像站：https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
# 从本镜像下载安装脚本并安装 Homebrew / Linuxbrew
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/Homebrew/install@HEAD/install.sh)"

# fzf: 找文件神器
# thefuck：自动纠错上条命令并执行 
# kubectl：先装上再说，永远会有k8s集群待你去连接
# kubectx: 切换集群和namespace，多集群管理好用得飞起
brew install fzf 
brew  install thefuck 
brew  install kubectl 
brew  install kubectx 

brew cleanup