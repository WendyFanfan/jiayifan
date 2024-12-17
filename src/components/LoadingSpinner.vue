<template>
    <div class="loading-container">
        <a-spin :tip="t('common.loading')">
            <slot></slot>
        </a-spin>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.loading-container {
    padding: @spacing-lg;
    text-align: center;
}
</style>