<template>
    <div class="markdown-editor">
        <div class="editor-header">
            <a-radio-group v-model:value="mode" button-style="solid">
                <a-radio-button value="edit">编辑</a-radio-button>
                <a-radio-button value="preview">预览</a-radio-button>
                <a-radio-button value="split">分屏</a-radio-button>
            </a-radio-group>
            <a-space>
                <a-tooltip title="加粗">
                    <a-button @click="insertMarkdown('**', '**')">
                        <template #icon>
                            <BoldOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="斜体">
                    <a-button @click="insertMarkdown('*', '*')">
                        <template #icon>
                            <ItalicOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="链接">
                    <a-button @click="insertMarkdown('[', '](url)')">
                        <template #icon>
                            <LinkOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="图片">
                    <a-button @click="insertMarkdown('![alt](', ')')">
                        <template #icon>
                            <PictureOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="代码块">
                    <a-button @click="insertCodeBlock">
                        <template #icon>
                            <CodeOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
            </a-space>
        </div>

        <div class="editor-content" :class="mode">
            <div v-show="mode !== 'preview'" class="editor-area">
                <a-input.TextArea v-model:value="content" :rows="20" :placeholder="placeholder"
                    @keydown.tab.prevent="handleTab" />
            </div>
            <div v-show="mode !== 'edit'" class="preview-area">
                <markdown-it-vue :content="content" :options="markdownOptions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MarkdownItVue from 'markdown-it'
import 'highlight.js/styles/github.css'
import {
    BoldOutlined,
    ItalicOutlined,
    LinkOutlined,
    PictureOutlined,
    CodeOutlined
} from '@ant-design/icons-vue'

const props = withDefaults(defineProps<{
    modelValue?: string
    placeholder?: string
}>(), {
    modelValue: '',
    placeholder: '请输入Markdown内容...'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const mode = ref<'edit' | 'preview' | 'split'>('edit')
const content = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// markdown-it 配置选项
const markdownOptions = {
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: true
}

const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = document.querySelector('.editor-area textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = content.value
    const selectedText = text.substring(start, end)

    content.value = text.substring(0, start) +
        prefix + selectedText + suffix +
        text.substring(end)

    setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(
            start + prefix.length,
            end + prefix.length
        )
    })
}

const insertCodeBlock = () => {
    insertMarkdown('\n```language\n', '\n```\n')
}

const handleTab = (e: KeyboardEvent) => {
    const textarea = e.target as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    content.value = content.value.substring(0, start) + '    ' +
        content.value.substring(end)

    setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
    })
}
</script>

<style lang="less" scoped>
.markdown-editor {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
}

.editor-header {
    padding: 8px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.editor-content {
    display: flex;
    min-height: 500px;

    &.edit .editor-area {
        width: 100%;
    }

    &.preview .preview-area {
        width: 100%;
    }

    &.split {

        .editor-area,
        .preview-area {
            width: 50%;
        }

        .preview-area {
            border-left: 1px solid #d9d9d9;
        }
    }
}

.editor-area {
    :deep(.ant-input) {
        border: none;
        border-radius: 0;
        resize: none;
        height: 100%;
        font-family: monospace;
    }
}

.preview-area {
    padding: 12px 24px;
    overflow-y: auto;
}
</style>