<template>
  <div>
    <el-menu
      :collapse="!$store.getters.sidebarOpened"
      :default-active="activeMenu"
      :uniqueOpened="true"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
      router
    >
      <sidebar-item
        v-for="item in menuRoutes"
        :key="item.path"
        :route="item"
      ></sidebar-item>
    </el-menu>
  </div>
</template>
<script setup>
import SidebarItem from './SidebarItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { computed } from 'vue'

const router = useRouter()
const menuRoutes = computed(() => {
  const routes = filterRoutes(router.getRoutes())
  return generateMenus(routes)
})

// 菜单默认激活
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style scoped></style>
