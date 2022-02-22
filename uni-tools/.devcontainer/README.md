# dockerfile编写步骤

1. 安装vscode的docker插件，获得自动提示语法，参考官方文档编写<https://docs.docker.com/engine/reference/builder/>
2. 参考官方最佳实践文档<https://docs.docker.com/develop/develop-images/dockerfile_best-practices/>
3. 尝试用dive工具分析各个layer的不必要文件<https://github.com/wagoodman/dive>
4. 用docker-shim进行裁剪<https://github.com/docker-slim/docker-slim>
5. 需要的话，进行安全扫描，扫出漏洞的话，一般通过更新dockerfile的各个安装组件的最新版本即可解决，尽量不要自己去改轮子
