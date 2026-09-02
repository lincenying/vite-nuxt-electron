## 2026-09-02 11:43:59

**改动内容**：将 Vite 已弃用的 `server.hmr.port` 迁移为 `server.ws.port`，消除 Vite 8 开发服务器弃用警告

- **`nuxt.config.ts`**：HMR WebSocket 端口配置从 `vite.server.hmr.port` 改为 `vite.server.ws.port`（57123）

**Commit Message**：

```
fix: 将 Vite HMR 端口配置迁移到 server.ws
```

## 2026-08-05 14:46:54

**改动内容**：评论列表无数据时展示空状态提示

- **`src/components/other/comments.vue`**：无评论时使用 Element Plus `el-empty` 提示「暂无评论，快来发表第一条吧」（各详情页共用）

**Commit Message**：

```
feat: 评论列表无数据时展示空状态提示
```

## 2026-08-05 14:26:30


**改动内容**：用 Drizzle ORM + SQLite 替换 Mock 接口，落地真实数据层

- **新增** `server/db/`（schema、实例、seed）、`server/services/`、`server/config/database.ts`、`server/plugins/db-init.ts`、`drizzle.config.ts`
- **改写** home/news/cases/faqs/comment/user 与 user 接口为 Drizzle 查询，删除 `sqlite3/init.ts`
- **依赖** 增加 `drizzle-orm`、`drizzle-kit`、`zod`；库文件 `.data/app.db`，启动空库自动种子填充
- **配置** 移除 Nitro `experimental.database`，新增 `NUXT_DATABASE_URL` 与 `db:generate` / `db:push` / `db:seed` 脚本

**Commit Message**：

```
feat: 用 Drizzle+SQLite 实现真实 API 并填充种子数据
```

## 2026-07-08 10:44:58

**改动内容**：Header 导航支持小屏响应式菜单

- **`src/components/global/header.vue`**：屏幕宽度 < 820px 时隐藏横向导航，右侧显示菜单图标，点击下拉展示完整导航（含产品分类子项）
- **`src/assets/scss/global/layout.scss`**：新增 820px 断点样式、移动端菜单面板与过渡动画

**Commit Message**：

```
feat: Header 导航支持小屏响应式下拉菜单
```

## 2026-07-02 17:32:37

**改动内容**：优化 README.md 文档

- **`README.md`**：补充项目特性、技术栈、环境要求、脚本说明、环境变量、目录结构、Electron 配置、示例页面等完整说明

**Commit Message**：

```
docs: 优化 README 项目文档
```

## 2026-07-02 16:59:33

**改动内容**：按站点风格重写 404/500 错误页面

- **新建 `src/components/other/error-page.vue`**：复用 TopBanner、面包屑导航与白色卡片布局，区分 404/500 文案，提供返回首页、返回上页、重新加载操作
- **`src/error.vue`**：接入 Header/Footer 与全局样式，开发环境 500 展示错误详情
- **`src/pages/[...all].vue`**：未匹配路由使用统一错误页组件（default 布局）
- **新建 `src/assets/scss/pages/error.scss`**：错误码 LED 字体与卡片阴影样式

**Commit Message**：

```
feat: 按站点风格重写 404/500 错误页面
```

## 2026-07-02 16:24:25

**改动内容**：新增 `NUXT_ELECTRON_ENABLED` 环境变量，控制是否启用 Electron

- **`nuxt.config.ts`**：新增 `parseEnvBool` 与 `isElectronEnabled`；按环境变量条件加载 `nuxt-electron` 模块与 `electron` 配置；`runtimeConfig.public.electronEnabled` 暴露给客户端
- **`package.json`**：`nuxt:*` 脚本默认 `NUXT_ELECTRON_ENABLED=false`（纯 Nuxt）；`app:*` 脚本默认 `NUXT_ELECTRON_ENABLED=true`（Electron 模式）
- **`.env.example`**：补充 `NUXT_ELECTRON_ENABLED` 说明

**Commit Message**：

```
feat: 新增 NUXT_ELECTRON_ENABLED 环境变量控制 Electron 开关
```

## 2026-07-02 15:57:39

**改动内容**：开发环境统一应用名称与图标，修正打包图标路径

- **`src/electron/main.ts`**：新增 `APP_NAME`、`APP_ICON_PATH` 常量；调用 `app.setName()` 设置开发/预览环境应用名；为 `BrowserWindow` 设置窗口图标；macOS 下调用 `app.dock.setIcon()` 设置 Dock 图标
- **`package.json`**：mac 打包图标改为 `./build/icons/icon.icns`；NSIS 安装/卸载图标路径修正为 `./build/icons/icon.ico`

**Commit Message**：

```
feat: 开发环境统一应用名称与图标配置
```

## 2026-06-30 15:00:00

**改动内容**：将 Electron 应用显示名称改为 Electron模板

- **`src/electron/main.ts`**：新增 `APP_NAME` 常量，调用 `app.setName('Electron模板')` 统一开发/运行时的菜单栏与应用名称
- **`package.json`**：`build.productName` 设置为 `Electron模板`，用于打包后的应用名称与安装包文件名

**Commit Message**：

```
feat: 设置 Electron 应用显示名称为 Electron模板
```

## 2026-06-30 14:36:03

**改动内容**：汉化 Electron 顶部应用菜单栏

- **新建 `src/electron/app-menu.ts`**：通过 `Menu.setApplicationMenu` 设置中文菜单（文件、编辑、视图、窗口），macOS 额外包含应用菜单
- **`src/electron/main.ts`**：应用就绪时调用 `setupAppMenu`

**Commit Message**：

```
feat: 汉化 Electron 顶部应用菜单
```

## 2026-06-30 14:31:28

**改动内容**：修复 Electron 导航 API 弃用警告

- **`src/electron/context-menu.ts`**：`canGoBack`/`goBack`/`canGoForward`/`goForward` 迁移至 `webContents.navigationHistory`

**Commit Message**：

```
fix: 迁移至 navigationHistory 导航 API
```

## 2026-06-30 14:29:11

**改动内容**：为 Electron 窗口添加右键上下文菜单

- **新建 `src/electron/context-menu.ts`**：实现 `setupContextMenu`，包含返回、前进、刷新、强制刷新、剪切/复制/粘贴/全选；开发模式下额外提供检查元素与开发者工具
- **`src/electron/main.ts`**：窗口创建后调用 `setupContextMenu`

**Commit Message**：

```
feat: 为 Electron 添加右键上下文菜单
```

## 2026-06-30 14:22:26

**改动内容**：修复 Vue Router 导航守卫 `next()` 弃用警告

- **`src/composables/index.ts`**：`useSaveScroll` 中 `onBeforeRouteLeave` 移除 `next` 回调，改为直接返回（允许导航）

**Commit Message**：

```
fix: 修复路由守卫 next() 弃用警告
```

## 2026-06-30 14:20:20

**改动内容**：修复 `pnpm run serve` 启动时出现两个 Electron 窗口和两个 DevTools 的问题

- **`package.json`**：`app:dev` 移除重复的 `electron .` 与冗余的 `tsc`/`tsc -w`，仅保留 `nuxt dev`（由 `nuxt-electron` 自动启动 Electron）
- **`src/electron/main.ts`**：开发模式判断改为使用 `VITE_DEV_SERVER_URL`（`nuxt-electron` 注入），替代 `npm_lifecycle_event`

**Commit Message**：

```
fix: 修复开发模式重复启动 Electron 窗口问题
```

## 2026-06-30 14:10:32

**改动内容**：修复剩余 TypeScript 类型报错，完成类型体系收尾

- **`use-http.ts`**：移除错误的 `async` 包装；新增 `HttpAsyncData<T>` 显式返回类型；修复 `onResponse` 回调参数类型；提取 `unwrapApiResponse` 工具函数
- **`src/types/http.types.ts`**：定义 `HttpAsyncData<T>` 统一 useFetch 封装返回类型
- **`src/api/*`**：所有 `get` 类 API 函数补充 `HttpAsyncData<T>` 返回类型注解
- **`composables/nuxt.ts`**：修复 `route.params` 动态索引类型
- **`composables/scroll.ts`**：导出 `ScrollbarInstance` 类型别名
- **`composables/delay.ts` 调用方**：`lists.vue`、`article/[id].vue` 改用 `status` 替代 `pending`
- **推荐组件**：`$ref` 改为 `ref`，修复 ReactiveVariable 赋值类型错误
- **演示页面**：修复 `Article`/`ListsData` 类型引用、`ScrollbarInstance` 导入

**验证结果**：`pnpm lint:ts` ✅ | `pnpm typecheck` ✅ | `pnpm lint` ✅（0 errors）

**Commit Message**：

```
fix: 修复 HTTP 封装与 API 层 TypeScript 类型推断问题
```

## 2026-06-30 13:55:39

**改动内容**：根据 Nuxt 4 开发规范全面优化项目结构与代码质量

- **基础设施**：`nuxt.config.ts` 新增 `runtimeConfig`（`NUXT_API_HOST` / `NUXT_PUBLIC_API_BASE`）；修复 `pnpm-workspace.yaml` 键排序；ESLint ignores 迁移至 `eslint.config.ts` 并删除 `.eslintignore`；新增 `typecheck` 脚本
- **类型体系**：新建 `shared/types/` 定义 `ApiResponse<T>`、`ListPayload` 等共享类型；新建 `src/types/index.ts` 统一导出客户端类型
- **API 封装层**：新建 `src/api/` 模块（home、news、cases、faqs、article、comment、upload），stores 与 components 迁移至 API 层调用
- **HTTP 封装**：`use-http.ts` 使用 `ApiResponse<T>` 替代 `any` 解包响应；`composables/nuxt.ts`、`fetch.ts` 完善类型
- **路由规范**：全项目 `router-link` 替换为 `NuxtLink`；新增 `src/error.vue` 全局错误页
- **服务端示例**：`server/api/cases/getList.ts` 使用 `satisfies ApiResponse<T>` 约束返回格式

**Commit Message**：

```
refactor: 按 Nuxt 4 规范优化项目结构与 API 封装层
```

## 2026-06-30 13:40:47

**改动内容**：全面优化 `.cursor/rules/global-06-nuxt.mdc` Nuxt 开发规范

- 升级版本约定至 Nuxt 4.x，目录结构从 `src/` 调整为 `app/` + `shared/`
- 补充路径别名、`app.config.ts`、混合渲染（`routeRules`）、SSR 水合规范
- 更新数据获取选型表（`useRequestFetch`、`callOnce`、`getCachedData`）
- 修正废弃 API（`process.client`、`initialCache`、`usePinia` 手动注入）
- 更新 Pinia（`@pinia/nuxt`）、Element Plus（`@element-plus/nuxt`）集成方式
- 合并重复的环境变量章节，现代化类型命名（去掉强制 `I` 前缀）
- 更新代码示例（遵循 Nuxt 自动导入）、中间件（`defineNuxtRouteMiddleware`）、测试（`@nuxt/test-utils`）

**Commit Message**：

```
docs: 全面优化 Nuxt 4 开发规范文档
```
