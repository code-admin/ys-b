<template>
	<view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<view class="flex solid-bottom padding justify-between align-center">
					<view class=" text-bold text-orange"><text
							class="cuIcon-deliver_fill text-shadow padding-right-xs"></text>运费: {{card.amount}} 元
					</view>
					<view v-if="card.status === 1" class="cu-tag light round bg-gradual-orange"
						@click="eceiveDeliver(card)">抢单</view>
					<view v-else class="text-orange">
						{{card.statusName}}
					</view>
				</view>
				
				<navigator :url="'/pages/dispatch/order/detail?deliverId='+ card.id" hover-class="navigator-hover">
					<view class="padding">
						<view class="flex justify-between">
							<view class="flex justify-start">
								<text class="cuIcon-locationfill text-shadow padding-right-xs text-green"></text>
								<view class="text-sm">{{card.shippingAddress || '亚迦布科技'}}</view>
								<view class="text-sm text-center text-grey margin-left">{{card.originDistance/1000}}公里</view>
							</view>
						</view>
						<view class="flex margin-top-sm justify-between" v-for="(address,index) in card.addressList" :key="index">
							<view class="flex justify-start">
								<text v-if="card.addressList.length !== index+1" class="text-sm text-shadow padding-right-xs text-orange">拼</text>
								<text v-else class="cuIcon-locationfill text-shadow padding-right-xs text-orange"></text>
								<view class="text-sm">{{address}}</view>
								<!-- <view v-if="card.addressList.length === index+1" class="text-cut text-center text-grey margin-left">{{card.distance}} 公里</view> -->
							</view>
						</view>
						<view class="flex margin-top-sm justify-between">
							<view class="flex justify-start">
								<view class="text-sm ">总件数：<text class="bg-gradual-orange">{{card.totalNumber}} (个)</text> </view>
								<view class="text-sm margin-left">总重量：<text class="bg-gradual-orange">{{card.totalWeight}} (KG)</text>
								</view>
								<view class="text-center margin-left text-orange">{{card.distance}} 公里</view>
							</view>
						</view>
					</view>

					<view class="flex solid-top padding justify-between align-center">
						<view class="text-cut lighttext-blue">
							<text
								class="cuIcon-countdown text-shadow padding-right-xs text-orange"></text>{{card.createTime}}
						</view>
						<view class="text-cut lighttext-blue text-orange">详情</view>
					</view>
				</navigator>
			</view>
		</view>

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
			eceiveDeliver(order) {
				this.$request.post({
					data: this.queryParams,
					loadingTip: '加载中...',
					url: `deliver/receiveDeliver/${order.id}`
				}).then(res => {
					if(res.code === 10000){
						uni.$emit('eceiveDeliverCallBack',order.id)
					}
				})
			}
		}
	}
</script>

<style>
	.order-code {
		line-height: 28upx;
	}

	.solid-dotted {
		border-top: 1upx dotted rgba(0, 0, 0, 0.1);
	}
</style>
