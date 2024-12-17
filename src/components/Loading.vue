<template>
    <div class="loading-container">
        <a-spin :tip="$t('common.loading')">
            <slot></slot>
        </a-spin>
    </div>
</template>

<style lang="less" scoped>
.loading-container {
    padding: @spacing-lg;
    text-align: center;
}
</style>