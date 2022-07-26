<template>
  <div class="svg-icon-wrapper">
    <!-- 外部图标 -->
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      :class="className"
    ></div>
    <!-- 内部图标 -->
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { isExternal as checkExternal } from '@/utils/validate'

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断当前图片是否为外部图标
 */
const isExternal = computed(() => checkExternal(props.icon))

/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

/**
 * 内部图标处理
 */
const iconName = computed(() => `#icon-svg-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  -webkit-mask-size: cover !important;
  mask-size: cover !important;
  display: inline-block;
}
</style>
