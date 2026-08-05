import process from 'node:process'

// import { viteCss as vite } from './nuxt.config.vite'

import { appDescription } from './src/constants/index'

const apiHost = process.env.NUXT_API_HOST || 'https://php.mmxiaowu.com'

/** 解析布尔型环境变量（true/1/yes/on 为启用） */
function parseEnvBool(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined || value === '')
        return defaultValue
    return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

/** 是否启用 Electron，未设置时默认启用以保持模板原有行为 */
const isElectronEnabled = parseEnvBool(process.env.NUXT_ELECTRON_ENABLED, true)

export default defineNuxtConfig({
    srcDir: 'src',

    runtimeConfig: {
        apiHost,
        databaseUrl: process.env.NUXT_DATABASE_URL || 'file:.data/app.db',
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
            electronEnabled: isElectronEnabled,
        },
    },

    modules: [
        '@element-plus/nuxt',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@vue-macros/nuxt',
        '@vueuse/nuxt',
        '@nuxt/image',
        ...(isElectronEnabled ? ['nuxt-electron'] : []),
    ],

    elementPlus: { /** Options */ },

    experimental: {
        // 使用generate时，payload js资源包含在sw预缓存清单中
        // 但离线时丢失，禁用提取直到修复
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,

        // @ts-expect-error 缺失类型
        inlineSSRStyles: false,
    },

    css: [
        '@unocss/reset/tailwind-compat.css',
    ],

    colorMode: {
        classSuffix: '',
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        routeRules: {
            '/php/**': {
                proxy: `${apiHost}/api/fetch/**`,
            },
        },
        // 开启本地文件K/V存储
        storage: {
            fsdb: {
                driver: 'fs',
                // 相对项目根目录
                base: './.data/fsdb',
            },
        },
        // SQLite 由 Drizzle ORM 直连（见 server/db），不再使用 Nitro experimental.database
        externals: {
            external: ['better-sqlite3'],
        },
    },

    app: {
        rootId: 'nuxt-root',
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/static/favicon.ico', sizes: 'any' },
                { rel: 'stylesheet', href: '/static/css/reset.css' },
                { rel: 'apple-touch-icon', href: '/static/images/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    ssr: !isElectronEnabled, // 在Electron中禁用SSR

    devtools: {
        enabled: true,
    },

    devServer: {
        port: 7123,
    },

    imports: {
        // 自动导入的文件夹
        // dirs: [],
        // 仅导入 utils 中的 sleep 函数
        presets: [
            {
                from: '@lincy/utils',
                imports: ['sleep', 'UTC2Date'],
            },
        ],
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                },
            },
        },
        server: {
            hmr: {
                port: 57123,
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        // 处理css分块
                        if (id.includes('__uno.css')) {
                            return 'unocss'
                        }
                        const chunks = ['element-plus', 'md-editor-v3', 'markdown-it']
                        if (id.includes('/node_modules/')) {
                            for (const chunkName of chunks) {
                                if (id.includes(chunkName)) {
                                    return chunkName
                                }
                            }
                        }
                    },
                },
            },
        },
        optimizeDeps: {
            include: [
                '@element-plus/icons-vue',
                '@lincy/async-validation',
                'mitt',
                'store2',
            ],
        },
        // ...vite
    },
    hooks: {
        'prepare:types': ({ references }) => {
            references.push({ types: '@lincy/utils' })
        },
    },

    image: {
        presets: {
            cover: {
                modifiers: {
                    fit: 'cover',
                    format: 'jpg',
                    width: 300,
                    height: 200,
                },
            },
        },
    },

    ...(isElectronEnabled
        ? {
                electron: {
                    build: [
                        {
                            entry: 'src/electron/main.ts',
                        },
                        {
                            entry: 'src/electron/preload.ts',
                            onstart(options: { reload: () => void }) {
                                // Notify the renderer process to reload the page when the preload-script is completely loaded
                                // Instead of restarting the entire electron app
                                options.reload()
                            },
                        },
                    ],
                    renderer: {},
                    disableDefaultOptions: true,
                },
            }
        : {}),

    compatibilityDate: '2026-07-07',

    typescript: {
        nodeTsConfig: {
            include: ['../*.ts'],
        },
    },
})
