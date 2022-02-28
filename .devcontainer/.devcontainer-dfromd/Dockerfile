# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.217.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

COPY copy-kube-config.sh /usr/local/share/
# 这样每次新建一个bash或zsh的terminal，都会执行一下脚本进行kube配置同步，会卡几秒
RUN echo "source /usr/local/share/copy-kube-config.sh" | tee -a /root/.bashrc >> /root/.zshrc


# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
# COPY library-scripts/kubectl-helm-debian.sh /tmp/library-scripts/

## kubectl,helm,minikube feature实际使用的脚本
# RUN apt-get update && bash /tmp/library-scripts/kubectl-helm-debian.sh latest latest latest

## docker in docker feature实际使用的脚本
# COPY library-scripts/*.sh /tmp/library-scripts/

# ENV DOCKER_BUILDKIT=1
# RUN apt-get update && /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh
# ENTRYPOINT ["/usr/local/share/docker-init.sh"]
# VOLUME [ "/var/lib/docker" ]
# CMD ["sleep", "infinity"]
