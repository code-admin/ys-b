<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>

		<view v-if="loading">
			
			<view class="bg-white">
				<view class="cu-bar solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text>{{orderInfo.order.orderNo || ''}}
					</view>
					<view class="action text-sm text-gray">{{orderInfo.orderTime}}</view>
				</view>
				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">下单人：</view>
					<view class="padding-sm">{{orderInfo.order.orderUserName || ''}}</view>
				</view>
				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">发货方式：</view>
					<view class="padding-sm">{{orderInfo.order.deliveryName || ''}}</view>
				</view>
				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">收货人：</view>
					<view class="padding-sm">{{orderInfo.order.customerName || ''}}</view>
				</view>
				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">收货人电话：</view>
					<view class="padding-sm">{{orderInfo.order.phone || ''}}</view>
				</view>
				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">收货地址：</view>
					<view class="padding-sm">{{orderInfo.order.address || ''}}</view>
				</view>
			</view>
			
			<view class="">
				<view class="cu-bar bg-white solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text>订单类型: <view class="cu-tag light margin bg-cyan radius padding-sm">{{orderInfo.order.orderTypeName}}</view>
					</view>
				</view>
				<view v-if="!!orderInfo.order.orderExts">
					<product-item v-for="(goods,index) in orderInfo.order.orderExts"  :key="index"  :product="goods" :showDel="false" :orderType="orderInfo.orderType" @remove="removeGoods(index)" ></product-item>
				</view>
			</view>
			
			<view class="bg-white">
				<view class="cu-bar bg-white solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text>审核记录
					</view>
				</view>
				<view class="">
					<view class="cu-timeline">
						<view :class="{ 'cu-item': true, 'text-blue': index == 0 }" :key="index" v-for="(history, index) in orderInfo.historyList">
							<view class="content">
								<view class="cu-capsule radius">
									<view :class="['cu-tag', index == 0 ? 'bg-cyan':'bg-grey']">{{history.createBy}}</view>
									<view :class="['cu-tag', index == 0 ? 'line-cyan':'line-grey']">{{history.createTime}}</view>
								</view>
								<view class="margin-top">{{history.description}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction btn-position">
			<button v-if="!historyFlag"  class="cu-btn bg-blue lg" @tap="showConfirm=true">快速审核</button>
		</view>
		
	</view>
</template>

<script>
	import ProductItem from './common/ProductItem'
	import Express from './common/Express'
	export default {
		components:{
			ProductItem,
			Express
		},
		data() {
			return {
				historyFlag:0,
				loading:true,
				orderInfo:{},
				confirm:false,
				showConfirm: false
			}
		},
		onLoad(options) {
			this.historyFlag = options.historyFlag
			options.auditId && this.getOrderInfoById(options.auditId);
		},
		methods: {
			// 获取订单详情
			getOrderInfoById(auditId){
				this.loading = !this.loading
				this.$request.post({
					url: `audit/getAuditById/${auditId}`,
					loadingTip: '正在加载订单数据...',
				}).then(res => {
					this.loading = !this.loading
					this.orderInfo = res.data;
				}).catch(err =>{
					this.loading = !this.loading
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			},
			hideModal(){
				this.confirm = !this.confirm
			},
			
			updateData(){
				this.getOrderInfoById(this.orderInfo.id)
			},
		}
	}
</script>

<style lang="scss" scoped>
.btn-position{
	width: 100%;
	position: fixed;
	bottom: 65upx;
	z-index: 10;
}
</style>
