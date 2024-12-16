<template>
    <div class="about-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="16">
                <a-card :bordered="false">
                    <template #title>
                        <h1>关于我</h1>
                    </template>

                    <div class="profile-section">
                        <a-avatar :size="120" src="/avatar.jpg" />
                        <h2>Jiayi Fan</h2>
                        <p class="title">前端开发工程师</p>
                    </div>

                    <a-divider />

                    <div class="content-section">
                        <h3>个人简介</h3>
                        <p>{{ profile }}</p>

                        <h3>技术栈</h3>
                        <div class="skills">
                            <a-tag v-for="skill in skills" :key="skill.name" :color="skill.color">
                                {{ skill.name }}
                            </a-tag>
                        </div>

                        <h3>工作经历</h3>
                        <a-timeline>
                            <a-timeline-item v-for="exp in experience" :key="exp.company">
                                <template #dot>
                                    <CodeOutlined />
                                </template>
                                <div class="experience-item">
                                    <h4>{{ exp.company }}</h4>
                                    <p class="position">{{ exp.position }}</p>
                                    <p class="period">{{ exp.period }}</p>
                                    <p>{{ exp.description }}</p>
                                </div>
                            </a-timeline-item>
                        </a-timeline>
                    </div>
                </a-card>
            </a-col>

            <a-col :span="8">
                <a-card title="联系方式" :bordered="false">
                    <a-list :data-source="contacts" size="large">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <template #actions>
                                    <a :href="item.link" target="_blank">查看</a>
                                </template>
                                <a-list-item-meta>
                                    <template #avatar>
                                        <component :is="item.icon" />
                                    </template>
                                    <template #title>{{ item.title }}</template>
                                    <template #description>{{ item.description }}</template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>

                <a-card title="博客统计" :bordered="false" style="margin-top: 16px">
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-statistic title="文章数" :value="93" />
                        </a-col>
                        <a-col :span="12">
                            <a-statistic title="访问量" :value="24563" />
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    GithubOutlined,
    MailOutlined,
    WechatOutlined,
    CodeOutlined,
    LinkedinOutlined
} from '@ant-design/icons-vue'

const profile = ref(`作为一名充满热情的前端开发工程师，我专注于创建优秀的用户体验和高性能的Web应用。
我热爱学习新技术，并乐于在技术社区中分享知识和经验。在空闲时间，我喜欢通过博客分享技术见解，
同时也享受摄影和旅行带来的乐趣。`)

const skills = ref([
    { name: 'Vue.js', color: '#42b883' },
    { name: 'TypeScript', color: '#007acc' },
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Webpack', color: '#8dd6f9' },
    { name: '微前端', color: '#1890ff' }
])

const experience = ref([
    {
        company: 'XX科技有限公司',
        position: '高级前端开发工程师',
        period: '2022 - 至今',
        description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目。'
    },
    {
        company: 'YY互联网公司',
        position: '前端开发工程师',
        period: '2020 - 2022',
        description: '参与电商平台的开发，负责性能优化和用户体验改进。'
    }
])

const contacts = ref([
    {
        icon: GithubOutlined,
        title: 'GitHub',
        description: '@fanjiayi',
        link: 'https://github.com/fanjiayi'
    },
    {
        icon: MailOutlined,
        title: '邮箱',
        description: 'jiayifan076@gmail.com',
        link: 'mailto:jiayifan076@gmail.com'
    },
    {
        icon: LinkedinOutlined,
        title: 'LinkedIn',
        description: 'Jiayi Fan',
        link: '#'
    },
    {
        icon: WechatOutlined,
        title: '微信',
        description: '扫码添加',
        link: '#'
    }
])
</script>

<style lang="less" scoped>
.about-container {
    padding: 24px 0;
}

.profile-section {
    text-align: center;
    margin-bottom: 32px;
}

.title {
    color: #666;
    margin-top: 8px;
}

.content-section {
    h3 {
        margin: 24px 0 16px;
        color: #1890ff;
    }
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
}

.experience-item {
    h4 {
        margin: 0;
        color: #1890ff;
    }

    .position {
        font-weight: 500;
        margin: 4px 0;
    }

    .period {
        color: #666;
        font-size: 0.9em;
        margin-bottom: 8px;
    }
}
</style>