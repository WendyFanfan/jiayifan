<template>
    <div class="page-container">
        <a-row :gutter="[24, 24]">
            <a-col :span="mainSpan">
                <slot></slot>
            </a-col>

            <a-col v-if="$slots.sidebar" :span="24 - mainSpan">
                <slot name="sidebar"></slot>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    mainSpan?: number
}>(), {
    mainSpan: 16
})
</script>

<style lang="less" scoped>
.page-container {
    padding: 24px 0;
}
</style>