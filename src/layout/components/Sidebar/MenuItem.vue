<template>
  <!-- element icon -->
  <el-icon
    v-if="icon.includes('el-icon')"
    class="sub-el-icon"
    :size="14"
    :class="icon"
  >
    <component :is="elIconName" />
  </el-icon>
  <!-- 非element icon -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>
<script setup>
import { computed } from 'vue'
import { generateTitle } from '@/utils/i18n'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
const elIconName = computed(() => {
  if (props.icon.includes('el-icon')) {
    const arr = props.icon.split('-')
    return arr[arr.length - 1]
  }
  return ''
})
</script>
<style lang="scss" scoped></style>
