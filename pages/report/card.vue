<template>
	<view>
		<view class="cu-card case no-card margin-top-sm">
			<view class="cu-item shadow" v-if="reportData.data">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>月份：<view class="text-cut text-bold text-xl">{{reportData.reportDate}}</view>
					</view>
				</view>
				<view class="padding">
					<view class="text-lg flex justify-start">
						<view class="flex align-center padding-right-xl">
							<view class="text-gray">总重量：</view>
							<view class="text-red text-bold">1085</view>
						</view>
						<view class="flex align-center">
							<view class="text-gray ">总单价：</view>
							<view class="text-red text-bold text-price"> 8851.4</view>
						</view>
					</view>
					<view class="text-lg flex justify-start margin-top-xs">
						<view class="flex align-center padding-right-xl">
							<view class="text-gray ">总金额：</view>
							<view class="text-red text-bold text-price">9599844</view>
						</view>
						<view class="flex align-center">
							<view class="text-gray">总收款：</view>
							<view class="text-red text-bold">5716699</view>
						</view>
					</view>
					<view class="text-lg flex justify-start margin-top-xs">
						<view class="flex align-center padding-right-xl">
							<view class="text-gray">总其它费用：</view>
							<view class="text-red text-bold text-price">-29355</view>
						</view>
						<view class="flex align-center">
							<view class="text-gray ">总退筒重量：</view>
							<view class="text-red text-bold">27</view>
						</view>
					</view>
					<view class="text-lg flex justify-start margin-top-xs">
						<view class="flex align-center padding-right-xl">
							<view class="text-gray ">总退筒金额：</view>
							<view class="text-red text-bold text-price">237475</view>
						</view>
					</view>

					<view class="flex justify-start solid-top margin-top-xs padding-top-xs">
						<view class="flex align-center padding-right-xl">
							<view class="text-gray">增白重量：</view>
							<view class="text-grey text-bold">679</view>
						</view>
						<view class="flex align-center">
							<view class="text-gray">增白单价：</view>
							<view class="text-grey text-bold text-price">8482</view>
						</view>
					</view>
					<view class="flex justify-start margin-top-xs">
						<view class="flex align-center padding-right">
							<view class="text-gray">增白金额：</view>
							<view class="text-grey text-bold text-price">5761380</view>
						</view>
					</view>
					<view class="flex justify-start margin-top-xs">
						<view class="flex align-center padding-right">
							<view class="text-gray">一级白重量：</view>
							<view class="text-grey text-bold">161</view>
						</view>
						<view class="flex align-center padding-right">
							<view class="text-gray">一级白单价：</view>
							<view class="text-grey text-bold text-price">1085</view>
						</view>
					</view>
					<view class="flex justify-start margin-top-xs">
						<view class="flex align-center padding-right">
							<view class="text-gray">一级白金额：</view>
							<view class="text-grey text-bold">1595042</view>
						</view>
					</view>
					<view class="flex justify-start margin-top-xs">
						<view class="flex align-center padding-right">
							<view class="text-gray">半透重量：</view>
							<view class="text-grey text-bold">192</view>
						</view>
						<view class="flex align-center padding-right">
							<view class="text-gray">半透单价：</view>
							<view class="text-grey text-bold text-price">9058</view>
						</view>
					</view>
					<view class="flex justify-start margin-top-xs">
						<view class="flex align-center padding-right">
							<view class="text-gray">半透金额：</view>
							<view class="text-grey text-bold text-price">1740349</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item shadow" v-else>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text>月份：<view class="text-cut text-bold text-xl">{{reportData.reportDate}}</view>
					</view>
				</view>
				<view class="padding text-center text-lg text-gray">
					没有查询到当前月份到报表数据！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ReportCard',
		data() {
			return {

			};
		},
		props: ['reportData']
	}
</script>

<style lang="scss" scoped>

</style>
