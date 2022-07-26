<template>
  <div>
    <el-dialog
      :title="$t('msg.universal.title')"
      :model-value="modelValue"
      @close="handleClose"
      width="22%"
    >
      <div class="content center">
        <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
        <el-color-picker
          v-model="mColor"
          :predefine="predefineColors"
        ></el-color-picker>
      </div>
      <template #footer>
        <el-button @click="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const store = useStore()

// 默认色值
const mColor = ref(store.getters.mainColor)

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const handleClose = () => {
  emits('update:modelValue', false)
}

// 颜色确定
const handleConfirm = async () => {
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', mColor.value)
  handleClose()
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
