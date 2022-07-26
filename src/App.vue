<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()

generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  if (store.getters.store) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style scoped></style>
