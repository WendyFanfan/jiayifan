<template>
  <a-layout class="layout">
    <!-- 侧边导航栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="sidebar">
      <div class="logo">
        <img src="" alt="logo" />
        <span v-show="!collapsed">My Blog</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="home">
          <template #icon>
            <HomeOutlined />
          </template>
          <router-link to="/">{{ $t('common.home') }}</router-link>
        </a-menu-item>
        <a-menu-item key="articles">
          <template #icon>
            <FileTextOutlined />
          </template>
          <router-link to="/articles">{{ $t('common.articles') }}</router-link>
        </a-menu-item>
        <a-menu-item key="categories">
          <template #icon>
            <FolderOutlined />
          </template>
          <router-link to="/categories">{{ $t('common.categories') }}</router-link>
        </a-menu-item>
        <a-menu-item key="archive">
          <template #icon>
            <HistoryOutlined />
          </template>
          <router-link to="/archive">{{ $t('common.archive') }}</router-link>
        </a-menu-item>
        <a-menu-item key="about">
          <template #icon>
            <UserOutlined />
          </template>
          <router-link to="/about">{{ $t('common.about') }}</router-link>
        </a-menu-item>
        <a-menu-item key="resources">
          <template #icon>
            <LinkOutlined />
          </template>
          <router-link to="/resources">{{ $t('common.resources') }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 顶部工具栏 -->
      <a-layout-header class="header">
        <div class="header-content">
          <div class="header-left">
            <a-button type="text" @click="() => (collapsed = !collapsed)">
              <MenuFoldOutlined v-if="!collapsed" />
              <MenuUnfoldOutlined v-else />
            </a-button>
          </div>
          <div class="header-right">
            <!-- 语言切换按钮 -->
            <a-dropdown>
              <a-button>
                {{ currentLang === 'en' ? 'English' : '中文' }}
                <template #icon>
                  <TranslationOutlined />
                </template>
              </a-button>
              <template #overlay>
                <a-menu @click="handleLanguageChange">
                  <a-menu-item key="en">
                    <GlobalOutlined /> English
                  </a-menu-item>
                  <a-menu-item key="zh">
                    <GlobalOutlined /> 中文
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <!-- 用户头像 -->
            <a-dropdown>
              <a-avatar class="avatar" src="/avatar.jpg" />
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <router-link to="/user">{{ $t('user.profile') }}</router-link>
                  </a-menu-item>
                  <a-menu-item key="settings">
                    <router-link to="/settings">{{ $t('user.settings') }}</router-link>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">{{ $t('user.logout') }}</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>

      <!-- 主要内容区域 -->
      <a-layout-content class="content">
        <div class="content-container">
          <router-view></router-view>
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer class="footer">
        {{ $t('common.footer') }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
  HomeOutlined,
  FileTextOutlined,
  FolderOutlined,
  HistoryOutlined,
  UserOutlined,
  LinkOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TranslationOutlined,
  GlobalOutlined
} from '@ant-design/icons-vue'

const { locale } = useI18n()
const selectedKeys = ref(['home'])
const collapsed = ref(false)

const currentLang = computed(() => locale.value)

const handleLanguageChange = ({ key }: { key: string }) => {
  locale.value = key
  localStorage.setItem('locale', key)
  message.success(key === 'zh' ? '已切换到中文' : 'Switched to English')
}
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}

.sidebar {
  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    overflow: hidden;

    img {
      height: 32px;
      width: 32px;
    }

    span {
      font-size: 18px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
}

.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  .header-content {
    .flex-between();
    padding: 0 @spacing-md;
    height: 100%;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: @spacing-md;

    .avatar {
      cursor: pointer;
    }
  }
}

.content {
  padding: @spacing-lg;
  background: @background-color;

  .content-container {
    max-width: @container-width;
    margin: 0 auto;
  }
}

.footer {
  text-align: center;
  color: @text-color-secondary;
}

@media (max-width: @screen-md) {
  .content {
    padding: @spacing-md;
  }
}
</style>
