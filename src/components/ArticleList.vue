<template>
    <a-list class="article-list" :data-source="articles" item-layout="vertical" size="large" :loading="loading"
        :pagination="{
            ...pagination,
            showTotal: (total) => $t('common.pagination.total', { total }),
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showQuickJumper: true,
            defaultPageSize: 10,
            locale: {
                items_per_page: $t('common.pagination.pageSize', { size: '{pageSize}' }),
                jump_to: $t('common.pagination.jump'),
                page: $t('common.pagination.page'),
                prev_page: $t('common.pagination.prev'),
                next_page: $t('common.pagination.next')
            }
        }">
        <template #loading>
            <LoadingSpinner />
        </template>
        <template #renderItem="{ item }">
            <a-list-item key="item.title">
                <template #extra>
                    <img width="272" :alt="item.title" :src="item.cover" />
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
                        <CalendarOutlined /> {{ $t('article.publishDate') }}: {{ item.date }}
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
                        <EyeOutlined /> {{ item.views }} {{ $t('article.views') }}
                    </span>
                </template>
            </a-list-item>
        </template>
        <template #renderEmpty>
            <div class="empty-content">
                <a-empty :description="$t('common.noData')" />
            </div>
        </template>
    </a-list>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CalendarOutlined, FolderOutlined, TagsOutlined, EyeOutlined } from '@ant-design/icons-vue'
import LoadingSpinner from './LoadingSpinner.vue'

const { t } = useI18n()

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
    loading?: boolean
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