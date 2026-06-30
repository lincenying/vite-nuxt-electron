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
