<template>
    <div class="article-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="16">
                <a-list class="article-list" :data-source="articles" item-layout="vertical" size="large"
                    :pagination="pagination">
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
                                    <a :href="`/categories/${item.category}`">{{ item.category }}</a>
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
            </a-col>

            <a-col :span="8">
                <a-card :bordered="false">
                    <a-input-search v-model:value="searchText" placeholder="搜索文章..." style="width: 100%"
                        @search="onSearch" />
                </a-card>

                <a-card title="分类" :bordered="false" style="margin-top: 16px">
                    <a-list :data-source="categories" size="small">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a :href="`/categories/${item.name}`">
                                    {{ item.name }}
                                    <a-tag>{{ item.count }}</a-tag>
                                </a>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>

                <a-card title="标签" :bordered="false" style="margin-top: 16px">
                    <div class="tag-cloud">
                        <a-tag v-for="tag in tags" :key="tag.name" :color="tag.color" style="margin: 4px">
                            {{ tag.name }} ({{ tag.count }})
                        </a-tag>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    CalendarOutlined,
    FolderOutlined,
    TagsOutlined,
    EyeOutlined
} from '@ant-design/icons-vue'

const searchText = ref('')

const articles = ref([
    {
        id: 1,
        title: '深入理解Vue3组合式API',
        description: '前端开发',
        avatar: '/avatar.jpg',
        cover: '/article-cover-1.jpg',
        excerpt: 'Vue3的组合式API（Composition API）是一个游戏规则改变者，它为我们提供了更好的代码组织方式...',
        date: '2024-03-20',
        category: '前端开发',
        tags: ['Vue3', 'JavaScript', '前端框架'],
        views: 328
    },
    {
        id: 2,
        title: 'TypeScript高级特性详解',
        description: '前端开发',
        avatar: '/avatar.jpg',
        cover: '/article-cover-2.jpg',
        excerpt: 'TypeScript作为JavaScript的超集，提供了许多强大的特性。本文将深入探讨一些高级特性...',
        date: '2024-03-18',
        category: '前端开发',
        tags: ['TypeScript', 'JavaScript'],
        views: 256
    }
])

const categories = ref([
    { name: '前端开发', count: 15 },
    { name: '后端开发', count: 8 },
    { name: '开发工具', count: 6 },
    { name: '生活随笔', count: 4 }
])

const tags = ref([
    { name: 'Vue3', count: 8, color: '#87d068' },
    { name: 'TypeScript', count: 12, color: '#108ee9' },
    { name: 'JavaScript', count: 15, color: '#2db7f5' },
    { name: 'Node.js', count: 6, color: '#f50' }
])

const pagination = {
    onChange: (page: number) => {
        console.log(page)
    },
    pageSize: 10
}

const onSearch = (value: string) => {
    console.log('搜索:', value)
}
</script>

<style lang="less" scoped>
.article-container {
    padding: 24px 0;
}

.article-list {
    background: white;
    padding: 24px;
}

.article-excerpt {
    color: #666;
    margin: 16px 0;
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
</style>