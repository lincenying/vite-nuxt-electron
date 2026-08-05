import { count } from 'drizzle-orm'
import { useDb, useSqlite } from './index'
import {
    articles,
    cases,
    categories,
    comments,
    faqs,
    news,
    products,
    users,
} from './schema'
import { imgUrl } from '../utils/img'

const DEFAULT_AVATAR = 'https://cravatar.cn/avatar/f7043d902c520089b324569ba690ea91?s=80&d=identicon&r=g'

const CATEGORY_TITLES = ['智能硬件', '企业服务', '云计算', '数据安全', '物联网', '人工智能']

const CONTENT_TITLES = [
    '数字化转型实践指南',
    '云原生架构落地经验',
    '智能运维体系建设',
    '微服务治理最佳实践',
    '数据中台建设路径',
    '低代码平台选型建议',
    '容器化部署实战分享',
    '前端性能优化全景',
    'API 网关设计要点',
    '权限模型与安全审计',
    '可观测性体系建设',
    '持续交付流水线优化',
]

const AUTHORS = ['张伟', '李娜', '王强', '赵敏', '陈晨', '刘洋']
const TAG_POOL = ['创新', '效率', '安全', '智能', '稳定', '开放', '敏捷', '可靠', '高效', '灵活']
const NAMES = ['小明', '小红', '阿杰', '小美', '大伟', '阿杰', '小林', '阿强']

/**
 * 格式化日期 yyyy-MM-dd
 */
function formatDate(dayOffset: number): string {
    const d = new Date()
    d.setDate(d.getDate() - dayOffset)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}

/**
 * 格式化日期时间 yyyy-MM-dd HH:mm:ss
 */
function formatDateTime(dayOffset: number, hour: number): string {
    return `${formatDate(dayOffset)} ${String(hour).padStart(2, '0')}:30:00`
}

/**
 * 生成 HTML 正文
 */
function buildContent(title: string): string {
    return Array.from({ length: 6 }, (_, i) =>
        `<p>${title}相关内容第 ${i + 1} 段。围绕业务落地、技术选型与团队协作展开说明，帮助读者快速理解实践要点。</p>`,
    ).join('')
}

/**
 * 生成简介
 */
function buildIntro(title: string): string {
    return `本文介绍「${title}」的核心思路、落地步骤与常见问题，供团队参考实践。`
}

/**
 * 用 drizzle push 等价方式：根据 schema 建表（CREATE IF NOT EXISTS）
 */
export function ensureSchema() {
    const sqlite = useSqlite()
    sqlite.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            category_id INTEGER NOT NULL REFERENCES categories(id),
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            img_url TEXT NOT NULL,
            views INTEGER NOT NULL DEFAULT 0,
            tags TEXT NOT NULL DEFAULT '[]'
        );

        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            category_id INTEGER NOT NULL DEFAULT 0,
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            img_url TEXT NOT NULL,
            views INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS cases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            category_id INTEGER NOT NULL DEFAULT 0,
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            img_url TEXT NOT NULL,
            views INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS faqs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            category_id INTEGER NOT NULL DEFAULT 0,
            intro TEXT NOT NULL,
            content TEXT NOT NULL,
            img_url TEXT NOT NULL,
            views INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            category TEXT NOT NULL,
            views INTEGER NOT NULL DEFAULT 0,
            date TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_type TEXT NOT NULL,
            content_id INTEGER NOT NULL,
            parent_id INTEGER,
            user_name TEXT NOT NULL,
            avatar TEXT NOT NULL,
            date TEXT NOT NULL,
            body TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL DEFAULT '',
            nick_name TEXT NOT NULL DEFAULT '',
            role TEXT NOT NULL DEFAULT '',
            is_admin INTEGER NOT NULL DEFAULT 0,
            token TEXT NOT NULL DEFAULT '',
            userid TEXT,
            first_name TEXT,
            last_name TEXT,
            email TEXT
        );
    `)
}

/**
 * 若核心表为空则填充种子数据
 */
export function seedIfEmpty(options: { force?: boolean } = {}) {
    const db = useDb()
    const userCount = db.select({ value: count() }).from(users).get()?.value ?? 0

    if (userCount > 0 && !options.force) {
        return { seeded: false }
    }

    if (options.force) {
        const sqlite = useSqlite()
        sqlite.exec(`
            DELETE FROM comments;
            DELETE FROM products;
            DELETE FROM news;
            DELETE FROM cases;
            DELETE FROM faqs;
            DELETE FROM articles;
            DELETE FROM categories;
            DELETE FROM users;
            DELETE FROM sqlite_sequence;
        `)
    }

    // 登录用户
    db.insert(users).values([
        { name: 'admin', password: '123456', nickName: 'admin', role: '系统管理员', isAdmin: 1, token: 'admin', userid: '1001', firstName: '系统', lastName: '管理员', email: 'admin@example.com' },
        { name: 'editor', password: '123456', nickName: 'editor', role: '编辑人员', isAdmin: 1, token: 'editor', userid: '1002', firstName: '编辑', lastName: '人员', email: 'editor@example.com' },
        { name: 'test', password: '123456', nickName: 'test', role: '测试人员', isAdmin: 0, token: 'test', userid: '1003', firstName: '测试', lastName: '人员', email: 'test@example.com' },
        { name: 'demo1', password: '123456', nickName: '演示一', role: '普通用户', isAdmin: 0, token: 'demo1', userid: '2001', firstName: '张', lastName: '三', email: 'zhangsan@example.com' },
        { name: 'demo2', password: '123456', nickName: '演示二', role: '普通用户', isAdmin: 0, token: 'demo2', userid: '2002', firstName: '李', lastName: '四', email: 'lisi@example.com' },
    ]).run()

    // 分类
    const categoryRows = CATEGORY_TITLES.map(title => ({ title }))
    const insertedCategories = db.insert(categories).values(categoryRows).returning().all()

    const contentCount = 30

    // 产品
    const productRows = Array.from({ length: contentCount }, (_, i) => {
        const cat = insertedCategories[i % insertedCategories.length]!
        const title = `${CONTENT_TITLES[i % CONTENT_TITLES.length]} · 产品 ${i + 1}`
        const tags = [
            TAG_POOL[i % TAG_POOL.length]!,
            TAG_POOL[(i + 2) % TAG_POOL.length]!,
            TAG_POOL[(i + 4) % TAG_POOL.length]!,
        ]
        return {
            title,
            author: AUTHORS[i % AUTHORS.length]!,
            date: formatDate(i),
            category: cat.title,
            categoryId: cat.id,
            intro: buildIntro(title),
            content: buildContent(title),
            imgUrl: imgUrl[i % imgUrl.length]!,
            views: 100 + i * 17,
            tags: JSON.stringify(tags),
        }
    })
    const insertedProducts = db.insert(products).values(productRows).returning().all()

    // 新闻 / 案例 / FAQ
    function buildGenericRows(prefix: string) {
        return Array.from({ length: contentCount }, (_, i) => {
            const title = `${CONTENT_TITLES[i % CONTENT_TITLES.length]} · ${prefix} ${i + 1}`
            return {
                title,
                author: AUTHORS[i % AUTHORS.length]!,
                date: formatDate(i + 3),
                category: CATEGORY_TITLES[i % CATEGORY_TITLES.length]!,
                categoryId: (i % CATEGORY_TITLES.length) + 1,
                intro: buildIntro(title),
                content: buildContent(title),
                imgUrl: imgUrl[i % imgUrl.length]!,
                views: 80 + i * 13,
            }
        })
    }

    const insertedNews = db.insert(news).values(buildGenericRows('新闻')).returning().all()
    const insertedCases = db.insert(cases).values(buildGenericRows('案例')).returning().all()
    const insertedFaqs = db.insert(faqs).values(buildGenericRows('问答')).returning().all()

    // 文章
    const articleRows = Array.from({ length: 20 }, (_, i) => {
        const title = `${CONTENT_TITLES[i % CONTENT_TITLES.length]} · 文章 ${i + 1}`
        return {
            title,
            content: buildContent(title),
            author: '央视网',
            category: CATEGORY_TITLES[i % CATEGORY_TITLES.length]!,
            views: 50 + i * 21,
            date: formatDateTime(i, 10 + (i % 8)),
        }
    })
    const insertedArticles = db.insert(articles).values(articleRows).returning().all()

    // 评论：每类内容至少覆盖 id=1
    const commentTargets: Array<{ type: 'product' | 'news' | 'case' | 'faq' | 'article', id: number }> = [
        { type: 'product', id: insertedProducts[0]!.id },
        { type: 'news', id: insertedNews[0]!.id },
        { type: 'case', id: insertedCases[0]!.id },
        { type: 'faq', id: insertedFaqs[0]!.id },
        { type: 'article', id: insertedArticles[0]!.id },
        { type: 'product', id: insertedProducts[1]?.id ?? insertedProducts[0]!.id },
        { type: 'news', id: insertedNews[1]?.id ?? insertedNews[0]!.id },
    ]

    for (const target of commentTargets) {
        for (let p = 0; p < 3; p++) {
            const parent = db.insert(comments).values({
                contentType: target.type,
                contentId: target.id,
                parentId: null,
                userName: NAMES[p % NAMES.length]!,
                avatar: DEFAULT_AVATAR,
                date: formatDateTime(p, 12 + p),
                body: `关于该内容的第 ${p + 1} 条评论，写得很有参考价值。`,
            }).returning().get()!

            const childCount = p % 3
            for (let c = 0; c < childCount; c++) {
                db.insert(comments).values({
                    contentType: target.type,
                    contentId: target.id,
                    parentId: parent.id,
                    userName: NAMES[(p + c + 1) % NAMES.length]!,
                    avatar: DEFAULT_AVATAR,
                    date: formatDateTime(p, 14 + c),
                    body: `回复：同意楼上观点 ${c + 1}。`,
                }).run()
            }
        }
    }

    return { seeded: true }
}
