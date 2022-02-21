# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.217.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

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