<template>
	<view>
		<navigator url="/pages/feedback/detail?feedbackId=iw2389276172s3l23231a" hover-class="navigator-hover">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="flex solid-bottom padding justify-between align-center">
						<view class="text-cut text-black text-bold text-grey">克重不准，同一批次色差很严重！！！！</view>
						<view class="cu-tag light bg-orange">质量问题</view>
					</view>
					<view class="padding">

						<view class="flex justify-between">
							<view>
								<view class="flex justify-start align-center">
									<view class="padding-right-xs text-grey">客户名称:</view>
									<view class="padding-right-xl">章细花</view>
									<view class=""><text class="cuIcon-dianhua padding-right-xs text-orange"></text>13800138000</view>
								</view>
							</view>
							<view>
							</view>
						</view>


						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">机台号:</view>
							<view class="padding-right-xl text-red">17</view>
							<view class="padding-right-xs text-grey">生产日期:</view>
							<view class="padding-right-xl">2019-04-16</view>
							<view class="cu-tag light round bg-blue sm">一级增白</view>
						</view>

						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">宽度:</view>
							<view class="padding-right-xl text-red">60</view>
							<view class="padding-right-xs text-grey">克重:</view>
							<view class="padding-right-xs text-red">55</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">备注:</view>
							<view class="text-cut max-width550">这时一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的备注</view>
						</view>
					</view>
					<view class="flex solid-top padding justify-between align-center">
						<view class="text-cut lighttext-blue"><text class="cuIcon-countdown padding-right-xs text-orange"></text>
							2017-11-30 10:13:22</view>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.max-width550 {
		width: 550upx;
	}
</style>
