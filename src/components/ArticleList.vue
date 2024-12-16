<template>
    <a-list class="article-list" :data-source="articles" item-layout="vertical" size="large" :pagination="pagination">
        <template #renderItem="{ item }">
            <a-list-item key="item.title">
                <template #extra>
                    <img width="272" alt="封面" :src="item.cover" />
                </template>
                <a-list-item-meta :description="item.description">
                    <template #title>
                        <router-link :to="`/articles/${item.id}`">{{ item.title }}</router-link>
                    </template>
                    <template #avatar>
                        <a-avatar :src="item.avatar" />
                    </template>
                </a-list-item-meta>
                <div class="article-excerpt">{{ item.excerpt }}</div>
                <template #actions>
                    <span>
                        <CalendarOutlined /> {{ item.date }}
                    </span>
                    <span>
                        <FolderOutlined />
                        <router-link :to="`/categories/${item.category}`">{{ item.category }}</router-link>
                    </span>
                    <span>
                        <TagsOutlined />
                        <span v-for="tag in item.tags" :key="tag">
                            <a-tag>{{ tag }}</a-tag>
                        </span>
                    </span>
                    <span>
                        <EyeOutlined /> {{ item.views }}
                    </span>
                </template>
            </a-list-item>
        </template>
    </a-list>
</template>

<script setup lang="ts">
import { CalendarOutlined, FolderOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons-vue'

defineProps<{
    articles: Array<{
        id: number
        title: string
        description: string
        avatar: string
        cover: string
        excerpt: string
        date: string
        category: string
        tags: string[]
        views: number
    }>
    pagination?: {
        onChange: (page: number) => void
        pageSize: number
    }
}>()
</script>

<style lang="less" scoped>
.article-list {
    background: white;
    padding: 24px;
}

.article-excerpt {
    color: #666;
    margin: 16px 0;
}
</style>