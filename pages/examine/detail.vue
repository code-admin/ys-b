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
			<button v-if="!historyFlag"  class="cu-btn bg-gradual-blue lg" @tap="showModal=true">快速审核</button>
		</view>
		
		<view class="cu-modal" :class="showModal ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">订单审核</view>
					<view class="action" @tap="showModal=false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">审核意见</view>
					<input v-model="audit.reason" placeholder="请输入审核意见" name="input"></input>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="operation(0)">
						<text class="cuIcon-check"></text>通过
					</view>
					<view class="action margin-0 flex-sub text-yellow " @tap="operation(1)">
						<text class="cuIcon-refresh"></text>驳回
					</view>
					<view class="action margin-0 flex-sub text-red " @tap="operation(2)">
						<text class="cuIcon-close"></text>不通过
					</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="showModal=false">
						<text class="cuIcon-back_android"></text>取消
					</view>
				</view>
			</view>
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
				showModal:false,
				audit: {
					auditId: null,
					reason: null,
					status: null
				}
			}
		},
		onLoad(options) {
			options.auditId && this.getOrderInfoById(options.auditId);
			this.historyFlag = options.historyFlag
			this.audit.auditId = options.auditId
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
			operation(opt){
				this.audit.status = opt
				this.$request.post({
					url:'audit/auditOrder',
					loadingTip: '正在提交数据...',
					data:{
						...this.audit
					}
				}).then(res => {
					this.getOrderInfoById(this.audit.auditId);
					this.showModal = !this.showModal;
					this.historyFlag = 1;
				}).catch(err =>{
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			}
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
