## 此文件夹的必要性

要补充微服务的k8s相关配置，或者增加新资源：

1. 在环境手动改配置，保证调测通过
2. 环境上的配置，拷贝到这里的yaml文件，可以充分利用vscode对k8s yaml语法的智能提示
3. 再从这写至helm或其他编排工具，进行最后测试。