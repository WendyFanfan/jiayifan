<template>
    <div class="resource-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="24">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane v-for="category in categories" :key="category.key" :tab="category.name">
                        <a-row :gutter="[16, 16]">
                            <a-col :span="8" v-for="resource in category.resources" :key="resource.title">
                                <a-card hoverable>
                                    <template #cover>
                                        <img :alt="resource.title" :src="resource.cover" />
                                    </template>
                                    <template #actions>
                                        <a-button type="link" @click="openLink(resource.link)">
                                            <template #icon>
                                                <LinkOutlined />
                                            </template>
                                            访问
                                        </a-button>
                                        <a-button type="link" @click="showDetail(resource)">
                                            <template #icon>
                                                <InfoCircleOutlined />
                                            </template>
                                            详情
                                        </a-button>
                                    </template>
                                    <a-card-meta :title="resource.title" :description="resource.description">
                                        <template #avatar>
                                            <a-avatar :src="resource.icon" />
                                        </template>
                                    </a-card-meta>
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>

        <a-modal v-model:open="modalVisible" :title="selectedResource?.title" @ok="modalVisible = false">
            <template #footer>
                <a-button type="primary" @click="modalVisible = false">
                    确定
                </a-button>
            </template>
            <div class="resource-detail">
                <p>{{ selectedResource?.fullDescription }}</p>
                <a-divider />
                <div class="tags">
                    <span>相关标签：</span>
                    <a-tag v-for="tag in selectedResource?.tags" :key="tag">{{ tag }}</a-tag>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LinkOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const activeKey = ref('tools')
const modalVisible = ref(false)
const selectedResource = ref(null)

const categories = ref([
    {
        key: 'tools',
        name: '开发工具',
        resources: [
            {
                title: 'VS Code',
                description: '强大的代码编辑器',
                fullDescription: 'Visual Studio Code是一个轻量级但功能强大的源代码编辑器，支持多种编程语言...',
                icon: '/vscode-icon.png',
                cover: '/vscode-cover.jpg',
                link: 'https://code.visualstudio.com',
                tags: ['编辑器', '开发工具', 'Microsoft']
            }
        ]
    },
    {
        key: 'learning',
        name: '学习资源',
        resources: [
            {
                title: 'Vue.js官方文档',
                description: 'Vue.js中文文档',
                fullDescription: 'Vue.js官方中文文档，包含完整的API参考和教程...',
                icon: '/vue-icon.png',
                cover: '/vue-cover.jpg',
                link: 'https://cn.vuejs.org',
                tags: ['Vue.js', '文档', '前端框架']
            }
        ]
    },
    {
        key: 'books',
        name: '推荐书籍',
        resources: [
            {
                title: '深入理解TypeScript',
                description: 'TypeScript进阶指南',
                fullDescription: '本书深入探讨TypeScript的各种高级特性和最佳实践...',
                icon: '/book-icon.png',
                cover: '/typescript-book-cover.jpg',
                link: '#',
                tags: ['TypeScript', '编程', '书籍']
            }
        ]
    }
])

const openLink = (link: string) => {
    window.open(link, '_blank')
}

const showDetail = (resource: any) => {
    selectedResource.value = resource
    modalVisible.value = true
}
</script>

<style lang="less" scoped>
.resource-container {
    padding: 24px 0;
}

.resource-detail {
    .tags {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}

:deep(.ant-card-cover) {
    padding: 12px;
    background: #fafafa;

    img {
        border-radius: 4px;
    }
}
</style>