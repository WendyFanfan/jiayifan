<template>
    <page-container>
        <template #default>
            <a-card :bordered="false">
                <template #title>
                    <div class="tag-header">
                        <h2>
                            <template v-if="currentTag">
                                <TagOutlined /> {{ currentTag }}
                            </template>
                            <template v-else>
                                所有标签
                            </template>
                        </h2>
                        <p class="subtitle">共 {{ filteredArticles.length }} 篇文章</p>
                    </div>
                </template>

                <article-list :articles="filteredArticles" :pagination="pagination" />
            </a-card>
        </template>

        <template #sidebar>
            <a-card title="热门标签" :bordered="false">
                <div class="tag-cloud">
                    <a-tag v-for="tag in sortedTags" :key="tag.name" :color="tag.color"
                        :class="{ active: currentTag === tag.name }" style="margin: 4px; cursor: pointer"
                        @click="handleTagClick(tag.name)">
                        {{ tag.name }} ({{ tag.count }})
                    </a-tag>
                </div>
            </a-card>

            <a-card title="相关分类" :bordered="false" style="margin-top: 16px">
                <a-list :data-source="relatedCategories" size="small">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <router-link :to="`/categories/${item.name}`">
                                {{ item.name }}
                                <a-tag>{{ item.count }}</a-tag>
                            </router-link>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </template>
    </page-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TagOutlined } from '@ant-design/icons-vue'
import { useArticleStore } from '@/stores/article'
import PageContainer from '@/components/PageContainer.vue'
import ArticleList from '@/components/ArticleList.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const currentTag = ref(route.params.tag || '')

// 获取所有标签及其文章数量，并按数量排序
const sortedTags = computed(() => {
    const tagMap = new Map()
    articleStore.articles.forEach(article => {
        article.tags.forEach(tag => {
            const count = tagMap.get(tag) || 0
            tagMap.set(tag, count + 1)
        })
    })
    return Array.from(tagMap.entries())
        .map(([name, count]) => ({
            name,
            count,
            color: getRandomColor()
        }))
        .sort((a, b) => b.count - a.count)
})

// 根据当前标签筛选文章
const filteredArticles = computed(() => {
    if (!currentTag.value) {
        return articleStore.articles
    }
    return articleStore.getArticlesByTag(currentTag.value)
})

// 获取相关分类
const relatedCategories = computed(() => {
    if (!currentTag.value) {
        return []
    }
    const categoryMap = new Map()
    filteredArticles.value.forEach(article => {
        const count = categoryMap.get(article.category) || 0
        categoryMap.set(article.category, count + 1)
    })
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }))
})

const pagination = {
    pageSize: 10,
    onChange: (page: number) => {
        console.log('页码改变:', page)
    }
}

const handleTagClick = (tag: string) => {
    currentTag.value = tag
    router.push(`/tags/${tag}`)
}

const getRandomColor = () => {
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#722ed1', '#eb2f96']
    return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style lang="less" scoped>
.tag-header {
    h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .subtitle {
        color: #666;
        margin: 8px 0 0;
    }
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.active {
    font-weight: bold;
}
</style>