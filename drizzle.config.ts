import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './server/db/schema/index.ts',
    out: './server/db/migrations',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.NUXT_DATABASE_URL?.replace(/^file:/, '') || './.data/app.db',
    },
})
