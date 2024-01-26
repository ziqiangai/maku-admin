<template>
	<el-card>
		<div ref="main" style="width: 100%; height: calc(100vh - 110px - var(--theme-header-height))"></div>
	</el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

onMounted(() => {
	init()
})

const main = ref()
const init = () => {
	const myChart = echarts.init(main.value)

	// 绘制图表
	myChart.setOption({
		title: {
			text: '学校资产统计（万）'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['教具', '活动用具', '体育器材', '实验用品', '办公耗材']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '教具',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '活动用具',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '体育器材',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '实验用品',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '办公耗材',
				type: 'line',
				stack: 'Total',
				label: {
					show: true,
					position: 'top'
				},
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	})
}
</script>
