<template>
  <div class="home-container">
    <a-row :gutter="[24, 24]">
      <!-- 个人简介区域 -->
      <a-col :span="24">
        <a-card class="profile-card">
          <a-avatar :size="64" src="/avatar.jpg" />
          <h1>Jiayi Fan</h1>
          <p>{{ $t('profile.bio') }}</p>
          <a-space>
            <a-button type="primary" href="https://github.com/fanjiayi">
              <GithubOutlined />
              GitHub
            </a-button>
            <a-button href="mailto:jiayifan076@gmail.com">
              <MailOutlined />
              联系我
            </a-button>
          </a-space>
        </a-card>
      </a-col>

      <!-- 最新文章列表 -->
      <a-col :span="16">
        <a-card :title="$t('article.latestPosts')" :bordered="false">
          <a-list :data-source="latestPosts" item-layout="vertical">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.title" :description="item.description">
                  <template #avatar>
                    <a-avatar :src="item.avatar" />
                  </template>
                </a-list-item-meta>
                {{ item.content }}
                <template #actions>
                  <span>
                    <ClockCircleOutlined /> {{ item.date }}
                  </span>
                  <span>
                    <EyeOutlined /> {{ item.views }}
                  </span>
                  <span>
                    <MessageOutlined /> {{ item.comments }}
                  </span>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <!-- 侧边栏 -->
      <a-col :span="8">
        <a-card title="分类" :bordered="false">
          <a-tag v-for="tag in tags" :key="tag" style="margin: 4px">
            {{ tag }}
          </a-tag>
        </a-card>

        <a-card title="热门文章" :bordered="false" style="margin-top: 16px">
          <a-list :data-source="hotPosts" size="small">
            <template #renderItem="{ item }">
              <a-list-item>
                <a href="#">{{ item.title }}</a>
              </a-list-item>
            </template>
          </a-list>
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
  ClockCircleOutlined,
  EyeOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'

const latestPosts = ref([
  {
    title: '使用Vue3构建现代化Web应用',
    description: '前端开发',
    avatar: '/article-avatar.jpg',
    content: 'Vue3带来了很多激动人心的新特性...',
    date: '2024-03-20',
    views: 156,
    comments: 8
  },
  // 更多文章...
])

const tags = ref(['Vue3', 'TypeScript', '前端开发', '生活随笔', '摄影'])

const hotPosts = ref([
  { title: 'TypeScript最佳实践指南' },
  { title: '我的摄影之旅' },
  { title: '前端性能优化技巧' }
])
</script>

<style scoped>
.home-container {
  padding: 24px 0;
}

.profile-card {
  text-align: center;
}

.profile-card :deep(.ant-card-body) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
