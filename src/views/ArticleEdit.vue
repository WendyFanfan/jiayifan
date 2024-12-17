<template>
    <page-container>
        <a-card :bordered="false">
            <template #title>{{ isEdit ? $t('article.editArticle') : $t('article.writeArticle') }}</template>
            <a-form :model="formState" layout="vertical">
                <a-form-item :label="$t('article.title')" required>
                    <a-input v-model:value="formState.title" :placeholder="$t('article.title')" />
                </a-form-item>

                <a-form-item :label="$t('article.category')" required>
                    <a-select v-model:value="formState.category" :placeholder="$t('category.allCategories')"
                        :options="categories" allow-clear />
                </a-form-item>

                <a-form-item :label="$t('article.tags')">
                    <a-select v-model:value="formState.tags" mode="tags" :placeholder="$t('article.tags')"
                        :options="tagOptions" allow-clear />
                </a-form-item>

                <a-form-item :label="$t('article.coverImage')">
                    <a-upload v-model:file-list="fileList" list-type="picture-card" :before-upload="beforeUpload">
                        <div v-if="fileList.length < 1">
                            <plus-outlined />
                            <div style="margin-top: 8px">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>

                <a-form-item :label="$t('article.content')" required>
                    <markdown-editor v-model="formState.content" />
                </a-form-item>

                <a-form-item>
                    <a-space>
                        <a-button type="primary" @click="handleSubmit">
                            {{ $t('article.publish') }}
                        </a-button>
                        <a-button @click="handleSaveDraft">
                            {{ $t('article.draft') }}
                        </a-button>
                        <a-button @click="$router.back()">
                            {{ $t('common.cancel') }}
                        </a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </a-card>
    </page-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import PageContainer from '@/components/PageContainer.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

const route = useRoute()
const { t } = useI18n()

const isEdit = computed(() => route.name === 'article-edit')

const formState = ref({
    title: '',
    category: undefined,
    tags: [],
    content: ''
})

const fileList = ref([])

const categories = [
    { value: 'frontend', label: '前端开发' },
    { value: 'backend', label: '后端开发' },
    { value: 'devops', label: 'DevOps' },
    { value: 'other', label: '其他' }
]

const tagOptions = [
    { value: 'Vue3', label: 'Vue3' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Node.js', label: 'Node.js' }
]

const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        message.error(t('common.messages.imageTypeError'))
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error(t('common.messages.imageSizeError'))
    }
    return isImage && isLt2M
}

const handleSubmit = () => {
    // TODO: 发布文章逻辑
    console.log('发布文章:', formState.value)
}

const handleSaveDraft = () => {
    // TODO: 保存草稿逻辑
    console.log('保存草稿:', formState.value)
}
</script>

<style lang="less" scoped>
:deep(.ant-upload-select) {
    width: 100% !important;
    height: 200px !important;
}
</style>