<template>
    <page-container>
        <template #default>
            <a-card :bordered="false">
                <a-tabs v-model:activeKey="activeTab">
                    <a-tab-pane key="articles" :tab="$t('user.articles')">
                        <a-list :data-source="userArticles" :loading="loading">
                            <template #header>
                                <a-space>
                                    <a-button type="primary" @click="$router.push('/articles/new')">
                                        <template #icon>
                                            <PlusOutlined />
                                        </template>
                                        {{ $t('article.writeArticle') }}
                                    </a-button>
                                    <a-radio-group v-model:value="articleStatus">
                                        <a-radio-button value="published">{{ $t('article.publish') }}</a-radio-button>
                                        <a-radio-button value="draft">{{ $t('article.draft') }}</a-radio-button>
                                    </a-radio-group>
                                </a-space>
                            </template>
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-list-item-meta :title="item.title" :description="item.date">
                                        <template #avatar>
                                            <a-tag :color="item.status === 'published' ? 'green' : 'orange'">
                                                {{ item.status === 'published' ? $t('article.publish') :
                                                $t('article.draft') }}
                                            </a-tag>
                                        </template>
                                    </a-list-item-meta>
                                    <template #actions>
                                        <a-space>
                                            <a-button type="link" @click="editArticle(item)">{{ $t('common.edit')
                                                }}</a-button>
                                            <a-popconfirm :title="$t('article.deleteConfirm')"
                                                @confirm="deleteArticle(item)">
                                                <a-button type="link" danger>{{ $t('common.delete') }}</a-button>
                                            </a-popconfirm>
                                        </a-space>
                                    </template>
                                </a-list-item>
                            </template>
                        </a-list>
                    </a-tab-pane>

                    <a-tab-pane key="comments" :tab="$t('user.comments')">
                        <a-list :data-source="userComments" :loading="loading">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-comment :author="item.author" :content="item.content" :datetime="item.datetime">
                                        <template #actions>
                                            <span>{{ $t('article.replyTo') }}: <a>{{ item.articleTitle }}</a></span>
                                            <a-button type="link" danger @click="deleteComment(item)">
                                                {{ $t('common.delete') }}
                                            </a-button>
                                        </template>
                                    </a-comment>
                                </a-list-item>
                            </template>
                        </a-list>
                    </a-tab-pane>

                    <a-tab-pane key="favorites" :tab="$t('user.favorites')">
                        <a-list :data-source="userFavorites" :loading="loading">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-list-item-meta :title="item.title" :description="item.description">
                                        <template #avatar>
                                            <a-avatar :src="item.avatar" />
                                        </template>
                                    </a-list-item-meta>
                                    <template #actions>
                                        <a-button type="link" @click="removeFavorite(item)">
                                            {{ $t('user.removeFavorite') }}
                                        </a-button>
                                    </template>
                                </a-list-item>
                            </template>
                        </a-list>
                    </a-tab-pane>
                </a-tabs>
            </a-card>
        </template>

        <template #sidebar>
            <a-card :bordered="false">
                <template #actions>
                    <SettingOutlined key="setting" @click="$router.push('/settings')" />
                    <EditOutlined key="edit" />
                    <EllipsisOutlined key="ellipsis" />
                </template>
                <a-card-meta :title="$t('user.profile')" :description="$t('profile.bio')">
                    <template #avatar>
                        <a-avatar src="/avatar.jpg" />
                    </template>
                </a-card-meta>
                <div class="user-stats">
                    <a-row :gutter="16">
                        <a-col :span="8">
                            <a-statistic :title="$t('user.articles')" :value="42" />
                        </a-col>
                        <a-col :span="8">
                            <a-statistic :title="$t('user.comments')" :value="156" />
                        </a-col>
                        <a-col :span="8">
                            <a-statistic :title="$t('user.favorites')" :value="38" />
                        </a-col>
                    </a-row>
                </div>
            </a-card>
        </template>
    </page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    PlusOutlined,
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined
} from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'

const router = useRouter()
const activeTab = ref('articles')
const articleStatus = ref('published')
const loading = ref(false)

// 模拟数据
const userArticles = ref([
    {
        id: 1,
        title: '深入理解Vue3组合式API',
        date: '2024-03-20',
        status: 'published'
    },
    {
        id: 2,
        title: 'TypeScript最佳实践（草稿）',
        date: '2024-03-18',
        status: 'draft'
    }
])

const userComments = ref([
    {
        id: 1,
        author: 'Jiayi Fan',
        content: '写得很好，学习了！',
        datetime: '2024-03-20 14:21',
        articleTitle: 'Vue3性能优化指南'
    }
])

const userFavorites = ref([
    {
        id: 1,
        title: 'TypeScript高级特性详解',
        description: '深入探讨TypeScript的高级用法和最佳实践',
        avatar: '/article-avatar.jpg'
    }
])

const editArticle = (article: any) => {
    router.push(`/articles/${article.id}/edit`)
}

const deleteArticle = (article: any) => {
    userArticles.value = userArticles.value.filter(item => item.id !== article.id)
}

const deleteComment = (comment: any) => {
    userComments.value = userComments.value.filter(item => item.id !== comment.id)
}

const removeFavorite = (favorite: any) => {
    userFavorites.value = userFavorites.value.filter(item => item.id !== favorite.id)
}
</script>

<style lang="less" scoped>
.user-stats {
    margin-top: 24px;
    text-align: center;
}
</style>