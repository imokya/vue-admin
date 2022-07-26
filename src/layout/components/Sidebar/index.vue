<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="$store.getters.sidebarOpened ? 60 : 45"
        shape="square"
        :src="logo"
        class="avatar"
      ></el-avatar>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu.vue'
import logo from '@/assets/img/logo.png'
const logoHeight = 44
</script>

<style lang="scss" scoped>
.avatar {
  transition: width 0.3s ease-out;
}
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
