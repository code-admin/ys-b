<template>
	<view>
		<navigator url="/pages/examine/detail?orderId=2314143212341234" hover-class="navigator-hover">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="flex solid-bottom padding justify-between align-center">
						<view class="text-black text-bold text-grey">wx20171130003151</view>
						<view class="cu-tag light round bg-blue">待审核</view>
					</view>

					<view class="padding">
						<view class="flex justify-start">
							<view class="padding-right-xs text-grey">下单人:</view>
							<view class="text-center text-shadow">章细花</view>
						</view>
						<view class="flex justify-between margin-top">
							<view>
								<view class="flex justify-start align-center">
									<view class="padding-right-xs text-grey">下单类型:</view>
									<view class="padding-right-xl line-blue">按重量销售</view>
									<view class="cu-tag light round bg-cyan sm">一级增白</view>
								</view>
							</view>
							<view>
								<view class="text-price text-red text-right">
									80.00
								</view>
								<view class="text-grey text-right">
									x 1
								</view>
							</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">宽度:</view>
							<view class="padding-right-xs text-red">1.00</view>
							<view class="padding-right-xs text-grey">克重:</view>
							<view class="padding-right-xs text-red">1.00</view>
							<view class="padding-right-xs text-grey">条数:</view>
							<view class="padding-right-xs text-red">0.00</view>
							<view class="padding-right-xs text-grey">长度:</view>
							<view class="padding-right-xs text-red">1.00</view>
						</view>
					</view>


					<view class="padding">
						<view class="flex justify-between">
							<view>
								<view class="flex justify-start align-center">
									<view class="padding-right-xs text-grey">下单类型:</view>
									<view class="padding-right-xl line-cyan">按条数销售</view>
									<view class="cu-tag light round bg-cyan sm">增白</view>
								</view>
							</view>
							<view>
								<view class="text-price text-red text-right">
									90.00
								</view>
								<view class="text-grey text-right">
									x 1
								</view>
							</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">宽度:</view>
							<view class="padding-right-xs text-red">1.00</view>
							<view class="padding-right-xs text-grey">克重:</view>
							<view class="padding-right-xs text-red">0.00</view>
							<view class="padding-right-xs text-grey">条数:</view>
							<view class="padding-right-xs text-red">1.00</view>
							<view class="padding-right-xs text-grey">长度:</view>
							<view class="padding-right-xs text-red">1.00</view>
						</view>
					</view>

					<view class="flex solid-top padding justify-between align-center">
						<view class="text-cut lighttext-blue"><text class="cuIcon-countdown padding-right-xs text-orange"></text>2017-11-30
							10:13:22</view>
						<view class="text-cut lighttext-blue text-green">详情</view>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name: 'OrderCard',
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.order-code {
		line-height: 28upx;
	}
</style>
