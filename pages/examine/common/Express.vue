<template>
	<view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<view class="flex solid-bottom padding justify-between align-center">
					<view class="text-black text-bold text-grey">{{express.product.name + '/' + express.product.productNo }}</view>
					<button v-if="makingType === 1 && express.status === 1" class="cu-btn round sm bg-orange shadow" @tap="showConfirm(express.id)" >签收</button>
					<view v-if="makingType === 1 && express.status === 2" class="cu-tag light round bg-gray sm" >已签收</view>
				</view>
				
				<view class="padding solid-bottom">
					<view class="flex align-center">
						<view class="padding-right-xs text-grey">要求:</view>
						<view class="padding-right-xl">{{express.requirement}}</view>
					</view>
					<view class="flex align-center margin-top-xs">
						<view class="text-grey">宽度:</view>
						<view class="margin-right padding-left-xs text-blue"> {{express.width}}</view>
						<view class="text-grey">克重:</view>
						<view class="margin-right padding-left-xs text-blue"> {{express.weight}}</view>
						<view class="text-grey">重量:</view>
						<view class="margin-right  padding-left-xs text-blue"> {{express.totalWeight}}</view>
						<view class="text-grey">车皮:</view>
						<view class="margin-right padding-left-xs text-blue"> {{express.tareWeight}}</view>
					</view>
					<view class="flex align-center margin-top-xs">
						<view class="text-grey">单价:</view>
						<view class="margin-right padding-left-xs text-red text-price"> {{express.price}}</view>
						<view class="text-grey">净重:</view>
						<view class="margin-right padding-left-xs text-blue"> {{express.netWeight}}</view>
						<view class="text-grey">金额:</view>
						<view class="margin-right  padding-left-xs text-red text-price"> {{express.totalPrice}}</view>
					</view>
					<view class="flex align-center margin-top-xs">
						<view v-if="makingType === 1" class="text-grey">出库{{orderType === 2 ? '个':'条'}}数:</view>
						<view v-if="makingType === 2" class="text-grey">个数:</view>
						<view class="margin-right padding-left-xs text-red"> {{express.number}}</view>
						<view v-if="makingType === 1" class="text-grey">司机/电话:</view>
						<view v-if="makingType === 1" class="margin-right padding-left-xs text-blue"> {{express.driverName}} / {{express.driverPhone}}</view>
					</view>
				</view>
				
				<view class="flex padding align-center">
					<view class=" light sm text-gray"><text class="cuIcon-time text-sm text-gray padding-right"></text> {{express.createTime}}</view>
				</view>
				
			</view>
		</view>
		
		<view class="cu-modal" :class="confirm ?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					确定完成该产品的签收吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<form @submit="sign" report-submit>
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" form-type="submit">确定</button>
						</view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Express',
		data() {
			return {
				confirm:false,
				expressId:null
			};
		},
		props:{
			orderId:Number,
			orderType: Number,
			express:Object,
			makingType:{
				type:Number,
				default:1
			}
		},
		methods:{
			showConfirm(id){
				this.expressId = id
				this.confirm = !this.confirm
			},
			hideModal(){
				this.confirm = !this.confirm
			},
			sign(e){
				if(this.expressId){
					this.$request.post({
						url:'/order/signOrder',
						loadingTip:'正在提交数据...',
						data:{formId:e.detail.formId, orderId: this.orderId , orderExpressId: this.expressId }
					}).then(res =>{
						this.express.status= 2;
						this.$emit('updateData')
						uni.showToast({
							duration: 3000,
							title: res.message,
							icon: "success",
						})
					}).catch(err =>{
						uni.showToast({
							duration: 3000,
							title: err.message,
							icon: "none",
						})
					})
				}
				this.confirm = !this.confirm
			}
		}
	}
</script>

<style lang="scss">

</style>
