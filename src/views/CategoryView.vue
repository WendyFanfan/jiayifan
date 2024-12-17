<template>
    <page-container>
        <template #default>
            <a-card :bordered="false">
                <template #title>
                    <div class="category-header">
                        <h2>{{ currentCategory || $t('category.allCategories') }}</h2>
                        <p class="subtitle">{{ $t('archive.total', { count: filteredArticles.length }) }}</p>
                    </div>
                </template>

                <article-list :articles="filteredArticles" :pagination="pagination" />
            </a-card>
        </template>

        <template #sidebar>
            <a-card title="分类列表" :bordered="false">
                <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @select="handleCategorySelect">
                    <a-menu-item key="">
                        <template #icon>
                            <AppstoreOutlined />
                        </template>
                        全部分类
                        <span class="count">({{ articleStore.articles.length }})</span>
                    </a-menu-item>
                    <a-menu-item v-for="category in categories" :key="category.name">
                        <template #icon>
                            <FolderOutlined />
                        </template>
                        {{ category.name }}
                        <span class="count">({{ category.count }})</span>
                    </a-menu-item>
                </a-menu>
            </a-card>

            <a-card title="标签云" :bordered="false" style="margin-top: 16px">
                <div class="tag-cloud">
                    <router-link v-for="tag in tags" :key="tag.name" :to="`/tags/${tag.name}`">
                        <a-tag :color="tag.color">
                            {{ tag.name }} ({{ tag.count }})
                        </a-tag>
                    </router-link>
                </div>
            </a-card>
        </template>
    </page-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppstoreOutlined, FolderOutlined } from '@ant-design/icons-vue'
import { useArticleStore } from '@/stores/article'
import PageContainer from '@/components/PageContainer.vue'
import ArticleList from '@/components/ArticleList.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const currentCategory = ref(route.params.category || '')
const selectedKeys = ref([currentCategory.value])

// 获取所有分类及其文章数量
const categories = computed(() => {
    const categoryMap = new Map()
    articleStore.articles.forEach(article => {
        const count = categoryMap.get(article.category) || 0
        categoryMap.set(article.category, count + 1)
    })
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }))
})

// 获取所有标签及其文章数量
const tags = computed(() => {
    const tagMap = new Map()
    articleStore.articles.forEach(article => {
        article.tags.forEach(tag => {
            const count = tagMap.get(tag) || 0
            tagMap.set(tag, count + 1)
        })
    })
    return Array.from(tagMap.entries()).map(([name, count]) => ({
        name,
        count,
        color: getRandomColor()
    }))
})

// 根据当前分类筛选文章
const filteredArticles = computed(() => {
    if (!currentCategory.value) {
        return articleStore.articles
    }
    return articleStore.getArticlesByCategory(currentCategory.value)
})

const pagination = {
    pageSize: 10,
    onChange: (page: number) => {
        console.log('页码改变:', page)
    }
}

const handleCategorySelect = ({ key }: { key: string }) => {
    currentCategory.value = key
    if (key) {
        router.push(`/categories/${key}`)
    } else {
        router.push('/categories')
    }
}

// 生成随机颜色
const getRandomColor = () => {
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#722ed1', '#eb2f96']
    return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style lang="less" scoped>
.category-header {
    h2 {
        margin: 0;
    }

    .subtitle {
        color: #666;
        margin: 8px 0 0;
    }
}

.count {
    color: #999;
    font-size: 0.9em;
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    a {
        text-decoration: none;
    }
}
</style>