<!-- https://helm.sh/ -->
# 快速理解 helm

## 包含 3 个资源对象: repository, chart release
类比 docker, repository 就是 chart 的仓库, chart 就像 image, release 就像 container,通过 chart 实例化出来.
image 定义了代码的运行环境,我们只管业务代码即可.
chart 定义了集群的运行环境,我们只管计算/存储/网络即可.

```bash
#查看当前集群全部 release:
helm list

#快速将 chart 实例化成 release:
helm install metacloud-stack ./

# 卸载 release
helm uninstall metacloud-stack
```