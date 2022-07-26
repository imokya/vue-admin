<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="handleToggle"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)
const handleToggle = () => {
  screenfull.toggle()
}
const onChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', onChange)
})
onUnmounted(() => {
  screenfull.off('change', onchange)
})
</script>
<style lang="scss" scoped></style>
