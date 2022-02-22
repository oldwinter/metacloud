#!/usr/bin/env zx
// 均使用默认配置。这个脚本所负责的内容，一般通过ci软件界面进行，以进行更多的个性化定制。


time = await $`echo $(date "+%Y%m%d-%H%M%S")`

// [开发测试]环境安装。通过cli工具引导进行
// await $`zx install.mjs`

// cli工具还未完美，手动执行一次的脚本，安装一些额外的环境配置
// await $`zx temp.mjs`

// 业务代码构建
await $`zx build.mjs`

// 业务构建产物发布
await $`zx publish.mjs`

// 业务代码[部署/更新]至[开发测试/类生产/生产]环境
await $`zx deploy.mjs`
