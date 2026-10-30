# Vite + Nuxt 4 + Electron + TypeScript 模板

基于 **Nuxt 4** 的全栈 Vue 3 应用模板，可选集成 **Electron** 桌面端。同一套代码既可在浏览器中作为纯 Web 应用运行，也可打包为 macOS / Windows 桌面应用。

## 特性

- **Nuxt 4** + Vue 3 Composition API + TypeScript
- **Electron 可选**：通过环境变量 `NUXT_ELECTRON_ENABLED` 一键切换 Web / 桌面模式
- **Element Plus** UI + **UnoCSS** 原子类 + SCSS
- **Pinia** 状态管理，**VueUse** 工具库
- **Nitro** 服务端 API（Mock 数据、SQLite、FS 存储）
- 内置示例页面：产品展示、案例、新闻、FAQ、SQLite 文章、Markdown 编辑器
- Electron 中文菜单栏、右键菜单、自定义应用名称与图标
- ESLint / Stylelint / TypeScript 类型检查

## 技术栈

| 类别   | 技术                                         |
| ------ | -------------------------------------------- |
| 框架   | Nuxt 4、Vue 3、TypeScript                    |
| 桌面端 | Electron 43、nuxt-electron、electron-builder |
| UI     | Element Plus、UnoCSS、Sass                   |
| 状态   | Pinia                                        |
| 服务端 | Nitro、better-sqlite3                        |
| 构建   | Vite 8                                       |

## 环境要求

- **Node.js** >= 20
- **pnpm** >= 9（推荐）

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/lincenying/vite-nuxt-electron.git
cd vite-nuxt-electron

# 安装依赖（会自动执行 nuxi prepare）
pnpm install

# Electron 桌面开发（默认）
pnpm serve

# 纯 Nuxt Web 开发（浏览器访问 http://localhost:7123）
pnpm nuxt:dev
```

## 脚本说明

### 常用命令

| 命令                | 说明                                    |
| ------------------- | --------------------------------------- |
| `pnpm serve`        | Electron 开发模式（等同 `app:dev`）     |
| `pnpm build`        | Electron 打包（等同 `app:build`）       |
| `pnpm preview`      | Electron 本地预览（等同 `app:preview`） |
| `pnpm nuxt:dev`     | 纯 Nuxt 开发，不启动 Electron           |
| `pnpm nuxt:build`   | 纯 Nuxt 构建                            |
| `pnpm nuxt:preview` | 纯 Nuxt 预览                            |
| `pnpm typecheck`    | Nuxt + TypeScript 类型检查              |
| `pnpm lint`         | ESLint 检查                             |
| `pnpm lint:fix`     | ESLint 自动修复                         |
| `pnpm lint:css`     | Stylelint 检查并修复                    |

### Electron 模式 vs 纯 Nuxt 模式

| 模式     | 环境变量                      | 典型命令                      |
| -------- | ----------------------------- | ----------------------------- |
| Electron | `NUXT_ELECTRON_ENABLED=true`  | `pnpm serve` / `pnpm app:dev` |
| 纯 Nuxt  | `NUXT_ELECTRON_ENABLED=false` | `pnpm nuxt:dev`               |

未设置 `NUXT_ELECTRON_ENABLED` 时**默认启用 Electron**。

也可手动指定：

```bash
NUXT_ELECTRON_ENABLED=false pnpm nuxt dev   # 纯 Web
NUXT_ELECTRON_ENABLED=true pnpm nuxt dev    # Electron
```

## 环境变量

复制 `.env.example` 为 `.env` 或 `.env.development` 后按需修改：

```bash
cp .env.example .env
```

| 变量                    | 说明                                | 默认值                     |
| ----------------------- | ----------------------------------- | -------------------------- |
| `NUXT_ELECTRON_ENABLED` | 是否启用 Electron（`true`/`false`） | `true`                     |
| `NUXT_API_HOST`         | 后端 API 代理地址（服务端）         | `https://php.mmxiaowu.com` |
| `NUXT_PUBLIC_API_BASE`  | 客户端 API 基础路径                 | `/api`                     |

客户端可通过 `useRuntimeConfig().public.electronEnabled` 判断当前是否为 Electron 模式。

## 项目结构

```text
├── nuxt.config.ts          # Nuxt 构建配置、Electron 开关
├── app.config.ts           # 运行时应用配置
├── src/                    # Nuxt 应用目录
│   ├── api/                # 客户端 API 封装
│   ├── assets/             # 样式、图片、字体
│   ├── components/         # 公共组件
│   ├── composables/        # 组合式函数
│   ├── constants/          # 常量
│   ├── electron/           # Electron 主进程 / 预加载脚本
│   ├── layouts/            # 布局
│   ├── pages/              # 页面路由
│   ├── plugins/            # 客户端插件
│   ├── stores/             # Pinia 状态
│   ├── types/              # 类型定义
│   ├── app.vue             # 根组件
│   └── error.vue           # 全局错误页（404 / 500）
├── server/                 # Nitro 服务端
│   ├── api/                # API 路由
│   └── utils/              # 服务端工具
├── public/                 # 静态资源
├── build/icons/            # Electron 应用图标
└── release/                # electron-builder 输出目录
```

## Electron 配置

### 应用名称

| 场景        | 配置位置                             |
| ----------- | ------------------------------------ |
| 开发 / 预览 | `src/electron/main.ts` → `APP_NAME`  |
| 打包        | `package.json` → `build.productName` |

两处建议保持一致。

### 应用图标

1. 准备 `public/favicon.png`（建议 1024×1024）
2. 执行 `pnpm electron:generate-icons` 生成 `build/icons/` 下各平台图标
3. 开发环境图标由 `src/electron/main.ts` 读取 `build/icons/icon.png`
4. 打包图标在 `package.json` → `build.mac.icon` / `build.win.icon` 中配置

### 打包产物

```bash
pnpm build
# 输出目录：release/{version}/
# macOS: Electron模板_{version}.dmg
# Windows: Electron模板_{version}.exe（NSIS 安装包）
```

打包前请修改 `package.json` 中的 `build.appId` 为你的应用 ID。

## 开发说明

- 渲染模式为 **SPA**（`ssr: false`），适合 Electron 与纯客户端场景
- 开发服务器默认端口 **7123**，HMR 端口 **57123**
- Electron 主进程代码位于 `src/electron/`，修改后需重启开发服务
- 服务端 API 位于 `server/api/`，开发时随 Nuxt 一同热更新

## 示例页面

| 路由       | 说明                    |
| ---------- | ----------------------- |
| `/`        | 产品展示                |
| `/cases`   | 案例展示                |
| `/news`    | 新闻中心                |
| `/faqs`    | 常见问题                |
| `/article` | SQLite 文章（增删改查） |
| `/editor`  | Markdown 编辑器         |

## License

MIT

## Author

[LinCenYing](mailto:lincenying@gmail.com)
