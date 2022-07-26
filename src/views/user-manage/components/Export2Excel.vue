<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="handleClose"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
      type="text"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="handleConfirm" type="primary" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import * as Export2Excel from '@/utils/Export2Excel'
import { USER_RELATIONS } from './Export2ExcelConstants'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 导出数据
const loading = ref(false)
const handleConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  const data = formatJson(USER_RELATIONS, allUser)
  Export2Excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value
  })
  handleClose()
}

const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色要特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间
      if (headers[key] === 'openTime') {
      }
      return item[headers[key]]
    })
  })
}

// 表格名称
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')

watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
excelName.value = exportDefaultName

const handleClose = () => {
  emits('update:modelValue', false)
}
</script>

<style scoped></style>
