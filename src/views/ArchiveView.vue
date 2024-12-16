<template>
    <div class="archive-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="16">
                <a-card :bordered="false">
                    <template #title>
                        <h2>文章归档</h2>
                        <p class="subtitle">共计 {{ totalPosts }} 篇文章</p>
                    </template>

                    <a-timeline>
                        <a-timeline-item v-for="year in archives" :key="year.year">
                            <template #dot>
                                <CalendarOutlined style="font-size: 16px" />
                            </template>
                            <h3 class="year-title">{{ year.year }} 年</h3>
                            <a-timeline class="month-timeline">
                                <a-timeline-item v-for="month in year.months" :key="month.month" color="gray">
                                    <h4 class="month-title">{{ month.month }} 月</h4>
                                    <ul class="post-list">
                                        <li v-for="post in month.posts" :key="post.id">
                                            <span class="post-date">{{ post.date }}</span>
                                            <router-link :to="`/articles/${post.id}`" class="post-title">
                                                {{ post.title }}
                                            </router-link>
                                            <a-tag v-for="tag in post.tags" :key="tag" style="margin-left: 8px">
                                                {{ tag }}
                                            </a-tag>
                                        </li>
                                    </ul>
                                </a-timeline-item>
                            </a-timeline>
                        </a-timeline-item>
                    </a-timeline>
                </a-card>
            </a-col>

            <a-col :span="8">
                <a-card title="统计信息" :bordered="false">
                    <a-statistic-group>
                        <a-statistic title="文章总数" :value="totalPosts" />
                        <a-statistic title="分类总数" :value="totalCategories" />
                        <a-statistic title="标签总数" :value="totalTags" />
                    </a-statistic-group>
                </a-card>

                <a-card title="时间线" :bordered="false" style="margin-top: 16px">
                    <a-timeline>
                        <a-timeline-item v-for="year in yearList" :key="year">
                            <a href="#" @click.prevent="scrollToYear(year)">{{ year }} 年</a>
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