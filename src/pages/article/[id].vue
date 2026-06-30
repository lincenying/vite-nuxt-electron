<template>
    <div>
        <Logos mb-6 />
        <el-card v-loading="isLoading" mx-auto my-0 w-600px>
            <div mx-3 mb-3>
                <span class="text-sm btn" @click="router.go(-1)"> Back </span>
            </div>
            <el-scrollbar wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px - 36px)">
                <div text="center 18px" mb-30px font-800>{{ detail?.c_title }}</div>
                <div v-html="detail?.c_content"></div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { ListsData } from '~/types'
import { getArticleDemoDetail } from '~/api/article'
import { appName } from '~/constants'

const router = useRouter()
const id = useRouteParam('id')

const { data, pending } = await getArticleDemoDetail(id, { key: `article-detail-${id.value}` })

const isLoading = useDelay(pending, 100)

const detail = computed(() => data.value)

// 更新列表数据 ===>
const { data: posts } = useNuxtData<ListsData>('article-lists')
console.log('🚀 ~ file: [id].vue:35 ~ posts:', posts)

const list = posts.value?.list || []
const index = list.findIndex(item => item.c_id === Number(id.value))
if (index > -1) {
    list.splice(index, 1, {
        ...list[index],
        c_title: `${list[index].c_title} [clicked]`,
    })
}
// 更新列表数据 <===

useHead({
    title: `${detail.value?.c_title} - ${appName}`,
})

definePageMeta({
    layout: 'default',
    keepalive: true,
})
</script>
