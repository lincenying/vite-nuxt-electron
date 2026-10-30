// Nuxt 会扫描 types/ 做自动导入，不要在这里再导出其它文件里的同名类型

/** 演示文章类型 */
export interface Article {
    c_id: number
    c_title: string
    c_content: string
}

/** 演示文章列表响应 */
export interface ListsData {
    list: Article[]
    hasNext: boolean
}
