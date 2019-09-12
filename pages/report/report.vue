<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">报表</block>
		</cu-custom>
		<report-card v-for="(data,index) in dataList" :key="index" :reportData="data"></report-card>
	</view>
</template>

<script>
	import ReportCard from './card'
	export default {
		components:{
			ReportCard
		},
		data() {
			return {
				dataList:[{reportDate:'2017-05',data:{a:1}},{reportDate:'2017-04',data:{a:1}},{reportDate:'2017-03'}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
