<template>
    <page-container>
        <a-card :bordered="false">
            <a-tabs v-model:activeKey="activeTab">
                <a-tab-pane key="profile" :tab="$t('user.profile')">
                    <a-form :model="profileForm" layout="vertical">
                        <a-form-item :label="$t('user.avatar')">
                            <a-upload v-model:file-list="avatarList" name="avatar" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false" :before-upload="beforeAvatarUpload">
                                <img v-if="profileForm.avatar" :src="profileForm.avatar" alt="avatar" />
                                <div v-else>
                                    <plus-outlined />
                                    <div style="margin-top: 8px">{{ $t('common.upload') }}</div>
                                </div>
                            </a-upload>
                        </a-form-item>

                        <a-form-item :label="$t('user.nickname')" required>
                            <a-input v-model:value="profileForm.nickname" />
                        </a-form-item>

                        <a-form-item :label="$t('user.bio')">
                            <a-textarea v-model:value="profileForm.bio" :rows="4" />
                        </a-form-item>

                        <a-form-item :label="$t('user.website')">
                            <a-input v-model:value="profileForm.website" />
                        </a-form-item>

                        <a-form-item :label="$t('user.location')">
                            <a-cascader v-model:value="profileForm.location" :options="locationOptions"
                                :placeholder="$t('user.selectLocation')" />
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" @click="saveProfile">{{ $t('common.save') }}</a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>

                <a-tab-pane key="account" :tab="$t('user.settings')">
                    <a-form :model="accountForm" layout="vertical">
                        <a-form-item :label="$t('user.email')" required>
                            <a-input v-model:value="accountForm.email" />
                            <template #extra>
                                <a-tag v-if="accountForm.emailVerified" color="success">
                                    {{ $t('user.emailVerified') }}
                                </a-tag>
                                <a-button v-else type="link" @click="verifyEmail">
                                    {{ $t('user.verifyEmail') }}
                                </a-button>
                            </template>
                        </a-form-item>

                        <a-form-item :label="$t('user.changePassword')">
                            <a-input-password v-model:value="accountForm.oldPassword"
                                :placeholder="$t('user.currentPassword')" />
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="accountForm.newPassword"
                                :placeholder="$t('user.newPassword')" />
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="accountForm.confirmPassword"
                                :placeholder="$t('user.confirmPassword')" />
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" @click="saveAccount">
                                {{ $t('common.save') }}
                            </a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>

                <a-tab-pane key="notification" :tab="$t('user.notifications')">
                    <a-list :data-source="notificationSettings">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta :title="$t(item.titleKey)" :description="$t(item.descriptionKey)">
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
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import {
    PlusOutlined,
    BellOutlined,
    MailOutlined,
    MessageOutlined
} from '@ant-design/icons-vue'
import PageContainer from '@/components/PageContainer.vue'

const { t } = useI18n()
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
        titleKey: 'notifications.system.title',
        descriptionKey: 'notifications.system.description',
        icon: BellOutlined,
        enabled: true
    },
    {
        titleKey: 'notifications.email.title',
        descriptionKey: 'notifications.email.description',
        icon: MailOutlined,
        enabled: true
    },
    {
        titleKey: 'notifications.comment.title',
        descriptionKey: 'notifications.comment.description',
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
        message.error(t('common.messages.imageTypeError'))
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error(t('common.messages.imageSizeError'))
    }
    return isJpgOrPng && isLt2M
}

const saveProfile = () => {
    message.success(t('common.messages.saveSuccess'))
}

const saveAccount = () => {
    if (accountForm.value.newPassword !== accountForm.value.confirmPassword) {
        message.error(t('common.messages.passwordMismatch'))
        return
    }
    message.success(t('common.messages.saveSuccess'))
}

const verifyEmail = () => {
    message.info(t('common.messages.emailSent'))
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