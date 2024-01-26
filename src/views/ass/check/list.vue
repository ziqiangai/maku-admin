<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.name" placeholder="名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.reason" placeholder="理由" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			v-loading="state.dataListLoading"
			show-overflow-tooltip
			:data="state.dataList"
			border
			style="width: 100%"
			@selection-change="selectionChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="itemName" label="采购物品名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="quantity" label="数量" header-align="center" align="center"></el-table-column>
			<el-table-column prop="unitPrice" label="单价" header-align="center" align="center"></el-table-column>
			<el-table-column prop="totalPrice" label="总价" header-align="center" align="center"></el-table-column>
			<el-table-column prop="note" label="备注" header-align="center" align="center"></el-table-column>
			<el-table-column prop="manufacturer" label="厂家" header-align="center" align="center"></el-table-column>
			<el-table-column prop="purchaseReason" label="采购理由" header-align="center" align="center"></el-table-column>
			<el-table-column prop="category" label="类目" header-align="center" align="center"></el-table-column>
			<el-table-column prop="status" label="状态" header-align="center" align="center">
				<template #default="scope">
					{{ mapStatus(scope.row.status) }}
				</template>
			</el-table-column>
			<el-table-column prop="approvalComment" label="审批备注" header-align="center" align="center"></el-table-column>
		</el-table>

		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="SysUserIndex">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { ElMessage, UploadProps } from 'element-plus'
import cache from '@/utils/cache'
import constant from '@/utils/constant'

const state: IHooksOptions = reactive({
	dataListUrl: '/ass/check/page',
	deleteUrl: '/sys/user',
	queryForm: {
		name: '',
		status: ['5'],
		reason: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}
const handleSuccess: UploadProps['onSuccess'] = (res, file) => {
	if (res.code !== 0) {
		ElMessage.error('上传失败：' + res.msg)
		return false
	}

	ElMessage.success({
		message: '上传成功',
		duration: 500,
		onClose: () => {
			getDataList()
		}
	})
}

const { getDataList, mapStatus, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, downloadHandle } = useCrud(state)
</script>
