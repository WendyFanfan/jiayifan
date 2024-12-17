<template>
    <div class="article-detail">
        <a-row :gutter="[24, 24]">
            <a-col :span="16">
                <a-card :bordered="false" :loading="loading">
                    <!-- 文章标题 -->
                    <h1 class="article-title">{{ article.title }}</h1>

                    <!-- 文章元信息 -->
                    <div class="article-meta">
                        <span>
                            <CalendarOutlined /> {{ $t('article.publishDate') }}: {{ article.date }}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                            <UserOutlined /> {{ $t('article.author') }}: {{ article.author }}
                        </span>
                        <a-divider type="vertical" />
                        <span>
                            <EyeOutlined /> {{ article.views }} {{ $t('article.views') }}
                        </span>
                    </div>

                    <!-- 文章内容 -->
                    <div class="article-content markdown-body" v-html="article.content"></div>

                    <!-- 文章标签 -->
                    <div class="article-tags">
                        <TagsOutlined />
                        <a-tag v-for="tag in article.tags" :key="tag" style="margin: 0 4px">
                            {{ tag }}
                        </a-tag>
                    </div>

                    <!-- 分享按钮 -->
                    <div class="article-share">
                        <a-space>
                            <a-button type="primary">
                                <template #icon>
                                    <WeiboOutlined />
                                </template>
                                {{ $t('article.shareToWeibo') }}
                            </a-button>
                            <a-button>
                                <template #icon>
                                    <WechatOutlined />
                                </template>
                                {{ $t('article.shareToWechat') }}
                            </a-button>
                        </a-space>
                    </div>

                    <!-- 评论区 -->
                    <a-divider />
                    <div class="comment-section">
                        <h3>{{ $t('article.comments') }} ({{ article.comments.length }})</h3>
                        <a-comment>
                            <template #avatar>
                                <a-avatar src="/avatar.jpg" :alt="$t('user.nickname')" />
                            </template>
                            <template #content>
                                <a-form-item>
                                    <a-textarea v-model:value="commentValue" :rows="4"
                                        :placeholder="$t('article.commentPlaceholder')" />
                                </a-form-item>
                                <a-form-item>
                                    <a-button type="primary" @click="handleSubmit">
                                        {{ $t('article.addComment') }}
                                    </a-button>
                                </a-form-item>
                            </template>
                        </a-comment>

                        <a-list class="comment-list" :data-source="article.comments" item-layout="horizontal">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <a-comment :author="item.author" :avatar="item.avatar" :content="item.content"
                                        :datetime="item.datetime">
                                        <template #actions>
                                            <span @click="replyTo(item)">{{ $t('user.replyTo') }}</span>
                                        </template>
                                    </a-comment>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </a-card>
            </a-col>

            <a-col :span="8">
                <!-- 作者信息 -->
                <a-card :bordered="false">
                    <template #title>{{ $t('article.aboutAuthor') }}</template>
                    <a-avatar :size="64" src="/avatar.jpg" />
                    <h3>{{ article.author }}</h3>
                    <p>{{ $t('article.authorBio') }}</p>
                    <a-button type="primary" block>
                        {{ $t('article.followAuthor') }}
                    </a-button>
                </a-card>

                <!-- 相关文章 -->
                <a-card :title="$t('article.relatedPosts')" :bordered="false" style="margin-top: 16px">
                    <a-list :data-source="relatedArticles" size="small">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a :href="item.link">{{ item.title }}</a>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import {
    CalendarOutlined,
    UserOutlined,
    EyeOutlined,
    TagsOutlined,
    WeiboOutlined,
    WechatOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const commentValue = ref('')
const { t } = useI18n()
const loading = ref(true)

const article = ref({
    id: 1,
    title: '深入理解Vue3组合式API',
    author: '张三',
    date: '2024-03-20',
    views: 328,
    content: `
    <h2>引言</h2>
    <p>Vue3的组合式API（Composition API）是一个革命性的特性...</p>
    <h2>为什么需要组合式API？</h2>
    <p>在Vue2中，我们使用选项式API来组织代码...</p>
    <!-- 更多内容 -->
  `,
    tags: ['Vue3', 'JavaScript', '前端框架'],
    comments: [
        {
            author: '李四',
            avatar: '/avatar.jpg',
            content: '写得很好，学习了！',
            datetime: '2024-03-20 14:21'
        }
    ]
})

const relatedArticles = ref([
    { title: 'Vue3性能优化指南', link: '#' },
    { title: 'TypeScript与Vue3最佳实践', link: '#' },
    { title: '组合式API实战案例', link: '#' }
])

const handleSubmit = () => {
    if (!commentValue.value.trim()) {
        message.warning(t('article.commentRequired'))
        return
    }

    article.value.comments.unshift({
        author: '当前用户',
        avatar: '/avatar.jpg',
        content: commentValue.value,
        datetime: new Date().toLocaleString()
    })

    commentValue.value = ''
}

const replyTo = (comment: any) => {
    commentValue.value = `@${comment.author} `
}

onMounted(() => {
    // 获取文章详情
    console.log('文章ID:', route.params.id)
    // 模拟加载
    setTimeout(() => {
        loading.value = false
    }, 1000)
})
</script>

<style lang="less" scoped>
.article-detail {
    padding: 24px 0;
}

.article-title {
    font-size: 2em;
    margin-bottom: 16px;
}

.article-meta {
    color: #666;
    margin-bottom: 24px;
}

.article-content {
    margin: 24px 0;
    line-height: 1.8;
}

.article-tags {
    margin: 24px 0;
}

.article-share {
    margin: 24px 0;
    text-align: center;
}

.comment-section {
    margin-top: 24px;
}

:deep(.markdown-body) {
    font-size: 16px;

    h2 {
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        margin: 24px 0 16px;
    }

    p {
        margin: 16px 0;
        line-height: 1.8;
    }
}
</style>