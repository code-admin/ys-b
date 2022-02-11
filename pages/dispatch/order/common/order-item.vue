<template>
	<view class="cu-card case bg-yellow light">
		<view class="cu-item shadow">
			<view class="flex solid-bottom justify-between align-center padding-xs">
				<view class="text-progress">
					<text class="cuIcon-text padding-right-xs">{{order.orderNo}}</text>
					<view v-if="order.deliverStatus" class="cu-tag">
						{{order.deliverStatus === 1 ? '配送中':'送达'}}
					</view>
				</view>
				<view v-if="deliver.status===3 && !order.deliverStatus" class="text-sm cu-tag light round bg-gradual-orange shadow"
					@tap="getNowLocation(1)">开始配送
				</view>
				<view v-if="deliver.status > 3 && order.deliverStatus !==2" class="text-sm cu-tag light round bg-gradual-orange shadow"
					@tap="getNowLocation(2)">完成配送
				</view>
			</view>

			<view class="flex justify-start padding-xs" v-for="orderExt in order.orderExts" :key="orderExt.id">
				<text class="cuIcon-cuIcon text-shadow padding-right-xs text-orange"></text>
				<view class="text-sm">{{orderExt.productDescription}}</view>
				<view class="text-sm text-center text-grey margin-left">
					{{orderExt.goodsNumber ? `x${orderExt.goodsNumber}`: ''}}
				</view>
			</view>
			<view class="text-gray padding-xs text-sm">
				<text class="cuIcon-peoplefill padding-right-xs">{{order.orderUserName}}</text>
				<text class="cuIcon-mobilefill padding-right-xs">{{order.phone}}</text>
			</view>
			<view class="flex justify-between align-center padding-xs text-sm">
				<view class="text-cut lighttext-blue">
					<text class="cuIcon-locationfill text-shadow padding-right-xs">{{order.address}}</text>
				</view>
				<button class="cu-btn bg-orange round sm shadow" @tap="goAddress">导航</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			deliver: Object,
			order: Object,
			mapContext:Object
		},
		methods: {
			getNowLocation(status) {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.startDispatching(`${res.longitude},${res.latitude}`,status)
					}
				})
			},
			
			// 去目的地
			goAddress(){
				uni.$emit('goAddressCallBack',  Number(this.order.latitude),  Number(this.order.longitude),  this.order.address )
			},
			
			// 更新配送单状态
			updateStatus(deliverId){
				this.$request.post({url: `/deliver/delivering/${deliverId}`})
			},
			
			// 更新子订单的配送状态
			startDispatching(location, status) {
				const ags = {
					address: "", // 需要通过逆变地理信息（暂时传空）
					deliverId: this.deliver.id,
					location: location,
					relId: this.order.id,
					status: status
				}
				this.$request.post({
					data: ags,
					loadingTip: '加载中...',
					url: `/deliver/updateRel`
				}).then(res => {
					if(res.code === 10000){
						// 更新 配送单状态
						// this.updateStatus(this.deliver.id)
						// 通知 配送单刷新
						uni.$emit('startDispatchingCallBack',location,this.order)
					}
				})
			}
		}
	}
</script>

<style>

</style>
