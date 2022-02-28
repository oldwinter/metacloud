# 文件夹说明

- 使用vscode 的open in container功能，它会自动在文件夹的根目录生成.devcontainer文件夹，相关配置主要从devcontainer.json中读取，并在docker build 后，做一些配置指定的额外操作。
- 目前大内存机器，还未发现docker in docker存在什么性能问题，故现在先主玩docker in docker。
- docker in docker，意思就是在运行时的容器内，再装一套包含了docker deamon的完整的docker，并且后续的minikube也基于这个内部的docker进行创建。
- 另一种 docker from docker，意思就是在运行时的容器内，只装了个docker cli，实际访问的还是宿主机的/var/lib/docker.sock，因此后续的minikube其实也只是装在了宿主机上面。这种场景下，devcontainer的作用，更多的就是一个附带了docker kubectl istioctl等cli工具的壳。
