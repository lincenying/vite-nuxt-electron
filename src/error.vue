<template>
    <main p="x16px y40px" text="center teal-700 dark:gray-200">
        <div text-36px lh-40px>
            <div i-carbon-warning inline-block />
        </div>
        <div>{{ error?.statusCode === 404 ? '页面未找到' : '出错了' }}</div>
        <p mt-12px text-14px text-gray-500>{{ error?.message }}</p>
        <div>
            <button btn text-14px lh-20px m="12px t32px" @click="handleError">返回首页</button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

const error = useError()

useHead({
    title: `Error - ${appName}`,
})

function handleError() {
    clearError({ redirect: '/' })
}
</script>
