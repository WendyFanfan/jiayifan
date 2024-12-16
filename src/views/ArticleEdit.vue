<template>
    <page-container>
        <a-card :bordered="false">
            <a-form :model="formState" layout="vertical">
                <a-form-item label="文章标题" required>
                    <a-input v-model:value="formState.title" placeholder="请输入文章标题" />
                </a-form-item>

                <a-form-item label="文章分类" required>
                    <a-select v-model:value="formState.category" placeholder="请选择分类" :options="categories"
                        allow-clear />
                </a-form-item>

                <a-form-item label="文章标签">
                    <a-select v-model:value="formState.tags" mode="tags" placeholder="请输入标签" :options="tagOptions"
                        allow-clear />
                </a-form-item>

                <a-form-item label="封面图片">
                    <a-upload v-model:file-list="fileList" list-type="picture-card" :before-upload="beforeUpload">
                        <div v-if="fileList.length < 1">
                            <plus-outlined />
                            <div style="margin-top: 8px">上传</div>
                        </div>
                    </a-upload>
                </a-form-item>

                <a-form-item label="文章内容" required>
                    <markdown-editor v-model="formState.content" />
                </a-form-item>

                <a-form-item>
                    <a-space>
                        <a-button type="primary" @click="handleSubmit">发布文章</a-button>
                        <a-button @click="handleSaveDraft">保存草稿</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </a-card>
    </page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import PageContainer from '@/components/PageContainer.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

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

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        message.error('只能上传图片文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片必须小于2MB!')
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