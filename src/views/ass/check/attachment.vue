<template>
	<el-dialog v-model="visible" :title="!dataForm.url ? '查看材料' : '上传材料'" :close-on-click-modal="false" draggable>
		<el-upload
			class="avatar-uploader"
			:action="constant.uploadUrl"
			:headers="{ Authorization: cache.getToken() }"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
		</el-upload>
		<template #footer>
			<el-button v-if="btn" type="primary">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { addAttachment } from '@/api/sys/ass'

import type { UploadProps } from 'element-plus'
import constant from '@/utils/constant'
import cache from '@/utils/cache'
import { Plus } from '@element-plus/icons-vue'
const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	url: '',
	id: 0
})
const imageUrl = ref('')
const tid = ref(0)
const btn = ref(true)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	imageUrl.value = response.data.url
	dataForm.url = response.data.url
	submitHandle()
}

const init = (showBtn: boolean, url: string, id?: number) => {
	visible.value = true
  btn.value = showBtn;
	if (url) {
		imageUrl.value = url
		dataForm.url = url
	}
	tid.value = id || 0
	dataForm.id = id || 0
}

// 表单提交
const submitHandle = () => {
	addAttachment(dataForm.id, dataForm.url).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				visible.value = false
				emit('refreshDataList')
			}
		})
	})
}

defineExpose({
	init
})
</script>
<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
