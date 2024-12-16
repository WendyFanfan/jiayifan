<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="home">
          <router-link to="/">首页</router-link>
        </a-menu-item>
        <a-menu-item key="articles">
          <router-link to="/articles">文章</router-link>
        </a-menu-item>
        <a-menu-item key="categories">
          <router-link to="/categories">分类</router-link>
        </a-menu-item>
        <a-menu-item key="archive">
          <router-link to="/archive">归档</router-link>
        </a-menu-item>
        <a-menu-item key="about">
          <router-link to="/about">关于我</router-link>
        </a-menu-item>
        <a-menu-item key="resources">
          <router-link to="/resources">推荐资源</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <router-view></router-view>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      ©2024 我的博客 Created by Vue3 & Ant Design Vue
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['home'])
</script>

<style>
.layout {
  min-height: 100vh;
}

.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>
