<template>
    <a-menu-item v-for="category in categories" :key="category.name">
        <template #icon>
            <FolderOutlined />
        </template>
        {{ category.name }}
        <span class="count">({{ category.count }} {{ $t('category.articleCount') }})</span>
    </a-menu-item>
</template>

<script setup lang="ts">
import { FolderOutlined } from '@ant-design/icons-vue'

defineProps<{
    categories: Array<{
        name: string
        count: number
    }>
}>()
</script>

<style lang="less" scoped>
.count {
    color: #999;
    font-size: 0.9em;
}
</style>
</rewritten_file>