<template>
	<view>
		<navigator :url="card.status ? '/pages/order/detail?orderId='+ card.id : '/pages/order/edit?orderId='+ card.id" hover-class="navigator-hover">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="flex solid-bottom padding justify-between align-center">
						<view class="text-black text-bold text-grey">{{card.orderNo}}</view>
						<view class="cu-tag light round bg-blue">{{card.statusName}}</view>
					</view>
					<view class="padding">
						<view class="flex justify-between">
							<view class="flex justify-start">
								<view class="padding-right-xs text-grey">下单人:</view>
								<view class="text-center text-shadow">{{card.customerName}}</view>
							</view>
							<view class="line-blue">{{card.orderTypeName}}</view>
						</view>

						<view v-for="product in card.orderExts" :key="product.id">
							<view class="margin-top">
								<view class="flex justify-start align-center">
									<view class="padding-right-xs text-grey">产品:</view>
									<view class="cu-tag light round bg-cyan sm margin-right-xl">{{product.product.name}}</view>
									<view class="padding-right-xs text-grey">要求:</view>
									<view class="padding-right-lg text-red">{{product.requirement}}</view>
								</view>
							</view>
							
							<view v-if="card.orderType === 2" class="flex align-center margin-top-xs">
								<view class="text-grey">宽度:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.width}}</view>
								<view class="text-grey">克重:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.weight}}</view>
								<view class="text-grey">米数:</view>
								<view class="margin-right  padding-left-xs text-red"> {{product.length}}</view>
								<view class="text-grey">个数:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.goodsNumber}}</view>
							</view>
							<view v-else class="flex align-center margin-top-xs">
								<view class="text-grey">宽度:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.width}}</view>
								<view class="text-grey">克重:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.weight}}</view>
								<view class="text-grey">长度:</view>
								<view class="margin-right  padding-left-xs text-red"> {{product.goodsLength}}</view>
								<view class="text-grey">条数:</view>
								<view class="margin-right padding-left-xs text-red"> {{product.goodsNumber}}</view>
							</view>
							<view class="flex align-center margin-top-xs">
								<view class="text-grey">单价:</view>
								<view class="margin-right padding-left-xs text-red text-price"> {{product.price}}</view>
							</view>
						</view>
					</view>

					<view class="flex solid-top padding justify-between align-center">
						<view class="text-cut lighttext-blue">
							<text class="cuIcon-countdown padding-right-xs text-orange"></text>{{card.orderTime}}
						</view>
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
		props: {
			card: Object
		},
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
	.solid-dotted{
		border-top: 1upx dotted rgba(0, 0, 0, 0.1);
	}
</style>
