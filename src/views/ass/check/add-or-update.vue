<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item prop="itemName" label="采购物品名称">
						<el-input v-model="dataForm.itemName" placeholder="采购物品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item prop="quantity" label="数量">
						<el-input v-model="dataForm.quantity" placeholder="数量"></el-input>
					</el-form-item>
					<el-form-item prop="unitPrice" label="单价">
						<el-input v-model="dataForm.unitPrice" placeholder="单价"></el-input>
					</el-form-item>
					<el-form-item prop="totalPrice" label="总价">
						<el-input v-model="dataForm.totalPrice" placeholder="总价"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item prop="manufacturer" label="厂家">
						<el-input v-model="dataForm.manufacturer" placeholder="厂家"></el-input>
					</el-form-item>
					<el-form-item prop="status" label="类目">
						<el-select v-model="dataForm.category" placeholder="类目">
							<el-option v-for="status in categories" :key="status.value" :label="status.label" :value="status.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="note" label="备注">
						<el-input v-model="dataForm.note" placeholder="备注"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-form-item prop="purchaseReason" label="采购理由">
						<el-input v-model="dataForm.purchaseReason" type="textarea" :rows="4" placeholder="采购理由"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useAssApi } from '@/api/sys/user'
import { useAssSubmitApi } from '@/api/sys/ass'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const categories = ref([
	{
		value: '教具',
		label: '教具'
	},
	{
		value: '图书',
		label: '图书'
	},
	{
		value: '实验用品',
		label: '实验用品'
	},
	{
		value: '教材',
		label: '教材'
	}
])
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	version: 0,
	deleted: 0,
	creator: 0,
	create_time: '',
	updater: 0,
	update_time: '',
	itemName: '',
	quantity: 0,
	unitPrice: 0,
	totalPrice: 0,
	note: '',
	manufacturer: '',
	purchaseReason: '',
	category: '',
	status: '',
	approvalStatus: '',
	approvalComment: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getAss(id)
	}
}

// 获取信息
const getAss = (id: number) => {
	useAssApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	itemName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	quantity: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	unitPrice: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	purchaseReason: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	totalPrice: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useAssSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
