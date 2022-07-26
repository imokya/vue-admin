<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="handleImportExcel"
          v-permission="['distributePermission']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="handleExportExcel">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引-->
        <el-table-column label="#" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <!-- 手机号 -->
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.mobile')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
          prop="openTime"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleShowDetail(row)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              @click="handleShowRole(row)"
              v-permission="['distributePermission']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleRemove(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>
<script setup>
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { ref, onActivated, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/Export2Excel'
import RolesDialog from './components/roles'

const router = useRouter()

// 用户权限面板
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const handleShowRole = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

// 显示用户详情
const handleShowDetail = (row) => {
  router.push(`/user/info/${row._id}`)
}

// 导出excel
const exportToExcelVisible = ref(false)
const handleExportExcel = () => {
  exportToExcelVisible.value = true
}

// 用户数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)

// 分页事件
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// Excel处理
const handleImportExcel = () => {
  router.push('/user/import')
}

// 组件缓存激活事件
onActivated(getListData)

// 处理动作事件
const i18n = useI18n()
const handleRemove = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
