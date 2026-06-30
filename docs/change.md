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
