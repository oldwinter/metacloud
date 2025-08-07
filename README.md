<h1 align="center">metacloud</h1>

<div align="center">

一个使用 VSCode 和 Docker 构建的，用于快速搭建、部署和管理云原生应用的开发环境和工具集。

</div>

## 项目简介

metacloud 既是一个工具，也是一套方法论：

- **作为工具**：它利用 VSCode 和 Docker，将一台计算机衍生出无数个相互隔离的开发环境，让开发者可以轻松地在不同的项目和技术栈之间切换。
- **作为方法论**：它将开源社区中最新的思想和最热门的项目融合到工具中，提供一个“所见即所得”的云原生开发体验。

## 核心特性

- **面向开源社区**：不重复造轮子，项目完全基于最新、最热门的开源项目构建。
- **云原生就绪**：以容器原生（Container Native）为基础，逐步实现云原生（Cloud Native），并整合服务网格（Service Mesh）和 DevOps 实践。
- **多云支持**：旨在帮助开发者使用云，但不被任何特定的云平台绑定。

## 技术栈

- **前端**: Vue.js, Next.js, Element Plus, Vite
- **后端**: Go (Gin), Python (FastAPI)
- **数据库**: MySQL, Redis
- **网关**: Traefik
- **DevOps**: Docker, Docker Compose, Kubernetes, Helm, Istio
- **构建工具**: zx, pnpm, bun

## 目录结构

```
.
├── devops/         # DevOps 相关配置，包括 Docker Compose 和 Helm Charts
├── portal/         # 主门户，一个 Vue.js 应用
├── server/         # 后端服务，包括 Go 和 Python 实现
│   ├── gin-api-server/
│   └── fastapi/
├── ui/             # 其他 UI 应用
│   ├── nextjs/
│   └── vue3/
├── uni-tools/      # 命令行工具集
└── README.old.md   # 旧版的详细 README
```

## 快速开始

### 环境准备

- [VSCode](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/get-started/)
- [Node.js](https://nodejs.org/)

### 启动项目

1. **克隆项目**

   ```bash
   git clone https://github.com/oldwinter/MetaCloud.git
   cd MetaCloud
   ```

2. **使用 Docker Compose 启动开发环境**

   项目提供了多个 `docker-compose.yaml` 文件，用于不同的开发场景。例如，要启动单个服务的开发环境，可以运行：

   ```bash
   docker-compose -f devops/docker-compose.singledev.yaml up -d
   ```

   这将启动 `portal`, `gin-api-server` 等核心服务。

3. **访问应用**

   - **Portal**: `http://localhost:8000`

### 详细文档

有关更高级的用法，例如远程开发、连接到正在运行的容器以及部署到 Kubernetes，请参阅 [旧版 README](./README.old.md)。
