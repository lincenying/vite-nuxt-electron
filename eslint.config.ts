import lincy from '@lincy/eslint-config'

export default lincy(
    {
        unocss: true,
        formatters: true,
        ignores: [
            'public/static/**/*.js',
            'public/assets/**/*.js',
            'dist-electron/**/*.js',
            'dist/**/*.js',
            'dist/**/*.css',
            'src/assets/icon-font/*',
            'z-components.d.ts',
            'z-auto-imports.d.ts',
            'src/polyfill/index.js',
            '*.code-snippets',
        ],
        overrides: {
            yaml: {
                'pnpm/yaml-enforce-settings': 'off',
            },
        },
    },
)
