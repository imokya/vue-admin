<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        v-for="(tag, index) in $store.getters.tagsViewList"
        :key="tag.fullPath"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.fullPath }"
        :style="{
          backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
          borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
        }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <el-icon
          :size="10"
          @click.prevent.stop="handleClose(index)"
          v-show="!isActive(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </el-scrollbar>
    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex" />
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive, watch } from 'vue'
import ContextMenu from './ContextMenu'

const store = useStore()
const visible = ref(false)

/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

// 右键菜单
const selectIndex = ref(0)
const menuStyle = reactive({
  left: 0,
  top: 0
})
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

// 关闭标签
const handleClose = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

// 是否被选中
const route = useRoute()
const isActive = (tag) => {
  return tag.path === route.path
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
