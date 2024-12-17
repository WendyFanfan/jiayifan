<template>
    <div class="archive-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="16">
                <a-card :bordered="false" :loading="loading">
                    <template #title>
                        <h2>{{ $t('archive.title') }}</h2>
                        <p class="subtitle">{{ $t('archive.total', { count: totalPosts }) }}</p>
                    </template>

                    <a-timeline>
                        <a-timeline-item v-for="year in archives" :key="year.year">
                            <template #dot>
                                <CalendarOutlined style="font-size: 16px" />
                            </template>
                            <h3 class="year-title">{{ year.year }} {{ $t('archive.year') }}</h3>
                            <a-timeline class="month-timeline">
                                <a-timeline-item v-for="month in year.months" :key="month.month" color="gray">
                                    <h4 class="month-title">{{ month.month }} {{ $t('archive.month') }}</h4>
                                    <ul class="post-list">
                                        <li v-for="post in month.posts" :key="post.id">
                                            <span class="post-date">{{ post.date }}</span>
                                            <router-link :to="`/articles/${post.id}`" class="post-title">
                                                {{ post.title }}
                                            </router-link>
                                            <a-tag v-for="tag in post.tags" :key="tag">{{ tag }}</a-tag>
                                        </li>
                                    </ul>
                                </a-timeline-item>
                            </a-timeline>
                        </a-timeline-item>
                    </a-timeline>
                </a-card>
            </a-col>

            <a-col :span="8">
                <a-card :title="$t('archive.statistics')" :bordered="false">
                    <a-statistic-group>
                        <a-statistic :title="$t('archive.totalArticles')" :value="totalPosts" />
                        <a-statistic :title="$t('category.allCategories')" :value="totalCategories" />
                        <a-statistic :title="$t('article.tags')" :value="totalTags" />
                    </a-statistic-group>
                </a-card>

                <a-card :title="$t('archive.timeline')" :bordered="false" style="margin-top: 16px">
                    <a-timeline>
                        <a-timeline-item v-for="year in yearList" :key="year">
                            <a href="#" @click.prevent="scrollToYear(year)">
                                {{ year }} {{ $t('archive.year') }}
                            </a>
                        </a-timeline-item>
                    </a-timeline>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarOutlined } from '@ant-design/icons-vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const loading = ref(true)
const archives = ref([
    {
        year: 2024,
        months: [
            {
                month: 3,
                posts: [
                    {
                        id: 1,
                        title: '深入理解Vue3组合式API',
                        date: '03-20',
                        tags: ['Vue3', 'JavaScript']
                    },
                    {
                        id: 2,
                        title: 'TypeScript高级特性详解',
                        date: '03-18',
                        tags: ['TypeScript']
                    }
                ]
            },
            {
                month: 2,
                posts: [
                    {
                        id: 3,
                        title: '前端性能优化实践',
                        date: '02-28',
                        tags: ['性能优化', '前端开发']
                    }
                ]
            }
        ]
    },
    {
        year: 2023,
        months: [
            {
                month: 12,
                posts: [
                    {
                        id: 4,
                        title: '2023年前端技术回顾',
                        date: '12-31',
                        tags: ['年终总结', '前端技术']
                    }
                ]
            }
        ]
    }
])

setTimeout(() => {
    loading.value = false
}, 1000)

const totalPosts = computed(() => {
    return archives.value.reduce((total, year) => {
        return total + year.months.reduce((monthTotal, month) => {
            return monthTotal + month.posts.length
        }, 0)
    }, 0)
})

const totalCategories = ref(8)
const totalTags = ref(24)

const yearList = computed(() => {
    return archives.value.map(year => year.year)
})

const scrollToYear = (year: number) => {
    const element = document.querySelector(`[data-year="${year}"]`)
    element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="less" scoped>
.archive-container {
    padding: 24px 0;
}

.subtitle {
    color: #666;
    margin-top: 8px;
}

.year-title {
    font-size: 1.5em;
    margin-bottom: 16px;
    color: #1890ff;
}

.month-title {
    font-size: 1.2em;
    margin-bottom: 12px;
    color: #666;
}

.post-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.post-list li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.post-date {
    color: #666;
    margin-right: 16px;
    font-family: monospace;
}

.post-title {
    color: #333;
    text-decoration: none;

    &:hover {
        color: #1890ff;
    }
}

.month-timeline {
    margin-left: 24px;
}

:deep(.ant-timeline-item-content) {
    margin-bottom: 20px;
}
</style>