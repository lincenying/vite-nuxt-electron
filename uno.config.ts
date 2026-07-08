import { adminConfig, breakpoints } from '@lincy/unocss-base-config'

const config = adminConfig()

export default {
    ...config,
    theme: {
        ...config.theme,
        breakpoints: {
            ...config.theme?.breakpoints,
            'lt-s1080': '1080px',
            'lt-m1080': '1080.1px',
        },
    },
}
