<template>
    <page-container>
        <a-card :bordered="false">
            <a-tabs v-model:activeKey="activeTab">
                <a-tab-pane key="profile" tab="个人资料">
                    <a-form :model="profileForm" layout="vertical">
                        <a-form-item label="头像">
                            <a-upload v-model:file-list="avatarList" name="avatar" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false" :before-upload="beforeAvatarUpload">
                                <img v-if="profileForm.avatar" :src="profileForm.avatar" alt="avatar" />
                                <div v-else>
                                    <plus-outlined />
                                    <div style="margin-top: 8px">上传</div>
                                </div>
                            </a-upload>
                        </a-form-item>

                        <a-form-item label="昵称" required>
                            <a-input v-model:value="profileForm.nickname" />
                        </a-form-item>

                        <a-form-item label="个人简介">
                            <a-textarea v-model:value="profileForm.bio" :rows="4" />
                        </a-form-item>

                        <a-form-item label="个人网站">
                            <a-input v-model:value="profileForm.website" />
                        </a-form-item>

                        <a-form-item label="所在地">
                            <a-cascader v-model:value="profileForm.location" :options="locationOptions"
                                placeholder="请选择所在地" />
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" @click="saveProfile">保存修改</a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>

                <a-tab-pane key="account" tab="账号设置">
                    <a-form :model="accountForm" layout="vertical">
                        <a-form-item label="邮箱" required>
                            <a-input v-model:value="accountForm.email" />
                            <template #extra>
                                <a-tag v-if="accountForm.emailVerified" color="success">已验证</a-tag>
                                <a-button v-else type="link" @click="verifyEmail">验证邮箱</a-button>
                            </template>
                        </a-form-item>

                        <a-form-item label="修改密码">
                            <a-input-password v-model:value="accountForm.oldPassword" placeholder="当前密码" />
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="accountForm.newPassword" placeholder="新密码" />
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="accountForm.confirmPassword" placeholder="确认新密码" />
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" @click="saveAccount">保存修改</a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>

                <a-tab-pane key="notification" tab="消息通知">
                    <a-list :data-source="notificationSettings">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta :title="item.title" :description="item.description">
                                    <template #avatar>
                                        <component :is="item.icon" />
                                    </template>
                                </a-list-item-meta>
                                <a-switch v-model:checked="item.enabled" />
                            </a-list-item>
                        </template>
                    </a-list>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </page-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
    PlusOutlined,
    BellOutlined,
    MailOutlined,
    MessageOutlined
} from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'

const activeTab = ref('profile')
const avatarList = ref([])

const profileForm = ref({
    avatar: '/avatar.jpg',
    nickname: 'Jiayi Fan',
    bio: '热爱技术，热爱分享。专注于前端开发与技术写作。',
    website: 'https://example.com',
    location: ['浙江省', '杭州市']
})

const accountForm = ref({
    email: 'jiayifan076@gmail.com',
    emailVerified: true,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const notificationSettings = ref([
    {
        title: '系统通知',
        description: '系统更新、维护等通知',
        icon: BellOutlined,
        enabled: true
    },
    {
        title: '邮件通知',
        description: '接收订阅更新、评论等邮件提醒',
        icon: MailOutlined,
        enabled: true
    },
    {
        title: '评论通知',
        description: '他人评论你的文章时通知',
        icon: MessageOutlined,
        enabled: true
    }
])

const locationOptions = [
    {
        value: '浙江省',
        label: '浙江省',
        children: [
            {
                value: '杭州市',
                label: '杭州市'
            }
        ]
    }
]

const beforeAvatarUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG格式的图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片必须小于2MB!')
    }
    return isJpgOrPng && isLt2M
}

const saveProfile = () => {
    message.success('个人资料保存成功')
}

const saveAccount = () => {
    if (accountForm.value.newPassword !== accountForm.value.confirmPassword) {
        message.error('两次输入的密码不一致')
        return
    }
    message.success('账号设置保存成功')
}

const verifyEmail = () => {
    message.info('验证邮件已发送，请查收')
}
</script>

<style lang="less" scoped>
.avatar-uploader {
    :deep(.ant-upload) {
        width: 128px;
        height: 128px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>