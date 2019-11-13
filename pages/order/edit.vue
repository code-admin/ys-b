<template>
	<view class="bg-gradual-blue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">编辑订单</block>
			</cu-custom>
			
			<form @submit="saveOrSubmmit" report-submit class="block padding-bottom-xl">
				<view class="cu-bar bg-white solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text> 基本信息
					</view>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">下单人</view>
					<input name="orderUser" type="text" disabled v-model="orderInfo.userName"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">订单类型</view>
					<picker name="orderType" placeholder="请输选择订单类型" @change="changeOrderType" :range="orderTypeList" range-key="name">
						<view class="picker">{{orderTypeName}}</view>
					</picker>
				</view>
				
				
				<view class="cu-bar bg-white solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text> 产品信息
					</view>
					<view class="action">
						<form class="h45" @submit="showAddProductModal" report-submit >
							<button class="cu-btn round sm bg-blue shadow" form-type="submit">添加产品</button>
						</form>
					</view>
				</view>
				
				<view v-if="!!orderInfo.orderExts">
					<product-item v-for="(goods,index) in orderInfo.orderExts"  :key="index"  :product="goods"  :orderType="orderInfo.orderType" @remove="removeGoods(index)" ></product-item>
				</view>
				
				<view v-if="orderInfo.orderExts.length ===0">
					<view class="cu-card">
						<view class="cu-item shadow text-center padding text-sm text-gray">
							您还没有添加产品哦～
						</view>
					</view>
				</view>
				
				<view class="cu-bar bg-white solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text> 收货信息
					</view>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">发货方式</view>
					<input name="deliveryName" type="text" placeholder="请输入收货方式"  v-model="orderInfo.deliveryName"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">收货地址</view>
					<input name="address" type="text" placeholder="请输入收货地址" v-model="orderInfo.address"></input>
					<text class='cuIcon-locationfill text-orange' @tap="getLocation"></text>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">收货人</view>
					<input name="customerName" type="text" placeholder="请输入收货人" v-model="orderInfo.customerName"></input>
				</view>
				<view class="cu-form-group ">
					<view class="title text-grey">收货人电话</view>
					<input name="phone" type="number" placeholder="请输入收货人电话" v-model="orderInfo.phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-grey">备注</view>
					<input name="remark" type="text" placeholder="请输入备注" v-model="orderInfo.remark"></input>
					<!-- <textarea name="remark" v-model="orderInfo.remark" :rows="2" placeholder="请输入备注" maxlength="-1" auto-height></textarea> -->
				</view>
				<view class="flex">
					<view class="flex-sub ">
						<button class="cu-btn margin-sm block shadow bg-blue lg" :disabled="submitting" @tap="saveOrderInfo">
							<text v-if="submitting" class="cuIcon-loading2 cuIconfont-spin"></text>保存
						</button>
					</view>
					<view class="flex-sub ">
						<button class="cu-btn margin-sm block shadow bg-blue lg" form-type="submit" :disabled="submitting">
							<text v-if="submitting" class="cuIcon-loading2 cuIconfont-spin"></text>保存并提交
						</button>
					</view>
				</view>
			</form>
			
			<view class="cu-modal bottom-modal" :class="showBottomModal ? 'show':''">
				<view class="cu-dialog">
					<form @submit="pushGoods" report-submit >
						<view class="cu-bar bg-white">
							<view class="action text-grey" @tap="showBottomModal=!showBottomModal">取消</view>
							<button class="cu-btn block bg-white text-blue mb0" form-type="submit"> 确定 </button>
						</view>
						
						<view class="padding">
							
							<view class="cu-form-group ">
								<view class="title text-grey">产品名称</view>
								<!-- <picker name="orderType" placeholder="请输选择订单类型" @change="changeProduct" :range="productList" range-key="productDescription">
									<view class="picker">{{productName}}</view>
								</picker> -->
								<view>
									<view class="content">
										<text class="text-grey" @tap="showModal" data-target="viewModal">{{productName}}</text>
									</view>
								</view>
								
							</view>
							<view class="cu-form-group ">
								<view class="title text-grey">要求</view>
								<input class="text-left" name="requirement" type="text" disabled placeholder="请输入要求" v-model="goods.requirement"></input>
							</view>
							<view class="cu-form-group ">
								<view class="title text-grey">宽度(cm)</view>
								<input class="text-left" name="width" type="number" disabled placeholder="宽度(cm)" v-model="goods.width"></input>
								<view class="title text-grey">克重(g)</view>
								<input class="text-left" name="weight" type="number" disabled placeholder="克重(g)" v-model="goods.weight"></input>
							</view>
							
							<view v-if="orderInfo.orderType === 1" class="cu-form-group ">
								<view class="title text-grey">长度(cm)/条</view>
								<input class="text-left" name="goodsLength" type="number" disabled placeholder="长度(cm)/条" v-model="goods.goodsLength"></input>
								<view class="title text-grey">条数</view>
								<input class="text-left" name="goodsNumber" type="number" disabled placeholder="请输入条数" v-model="goods.goodsNumber"></input>
							</view>
							
							<view v-else class="cu-form-group ">
								<view class="title text-grey">米数(米)</view>
								<input class="text-left" name="length" type="number" placeholder="米数(M)/筒" v-model="goods.length"></input>
								<view class="title text-grey">个数</view>
								<input class="text-left"  name="goodsNumber" type="number" placeholder="下单数量" v-model="goods.goodsNumber"></input>
							</view>
							
							<view class="cu-form-group ">
								<view class="title text-grey">单价(元)</view>
								<input class="text-left" name="price" type="number"  placeholder="单价(元)" v-model="goods.price"></input>
							</view>
							<view class="cu-form-group ">
								<view class="title text-grey">备注</view>
								<input class="text-left" name="remark" placeholder="备注" v-model="goods.remark"></input>
							</view>
						</view>
					</form>
				</view>
			</view>
		</scroll-view>
		<!-- 全屏抽屉开始 -->
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullleft"></text>
		</view>
		<view class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-bar search" :style="[{marginTop:(StatusBar-20) + 'px'}]">
				<view class="search-form round" style="margin-right: 100upx;">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="输入搜索的关键字" confirm-type="search" @input="filterProduct"></input>
				</view>
				<!-- <view class="action" style="margin-right: 100upx;">
					<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
				</view> -->
			</view>
			<scroll-view scroll-y style="height: 85vh;">
				<view class="productslist cu-list menu card-menu margin-top-xs margin-bottom-xl shadow-lg">
					<view class="cu-item arrow" v-for="(item,index) in filterProductList" :key="index" @tap="changeProduct" :data-index="index">
						<view class="content">
							<text class="cuIcon-news text-grey"></text>
							<text class="text-grey">{{item.productDescription}}</text>
						</view>
					</view>
				</view>
				<view v-if="filterProductList.length ===0" class="empty-data" style="color:white;padding-top: 240upx;">
					暂无产品数据
				</view>
			</scroll-view>
		</view>
		<!-- 全屏抽屉结束 -->
	</view>
</template>

<script>
	import ProductItem from './common/ProductItem'
	export default {
		components:{
			ProductItem
		},
		data() {
			const user = uni.getStorageSync("user")
			return {
				modalName:null,
				StatusBar: this.StatusBar,
				showBottomModal:false,
				submitting: false,
				orderInfo:{
					userName: user.userName,
					orderUser: user.loginName,
					orderType:2,
					orderExts:[],
				},
				orderTypeName:'按重量',
				orderTypeList:[
					{id:1, name:'按条数'},
					{id:2, name:'按重量'}
				],
				goods:{
					productNo: null, // 产品编号
					productName: null, // 产品名称
					productId: null, // 产品ID
					requirement:null , // 要求
					width:null , // 宽度
					weight:null , // 克重
					goodsLength:null , // 长度
					goodsNumber:0 , // 下单数量/条数
					price:null , // 单价
					remark:null, // 备注
				},
				productName:'请选择产品',
				productList:[],
				filterProductList: []
			}
		},
		onLoad(options) {
			options.orderId && this.getOrderInfoById(options.orderId);
			this.getProductList();
		},
		methods: {
			// 获取订单详情
			getOrderInfoById(orderId){
				this.$request.post({
					url: `/order/getOrderById/${orderId}`,
					loadingTip: '正在加载订单数据...',
				}).then(res => {
					this.orderInfo = res.data;
				}).catch(err =>{
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			},
			// 获取可用产品列表
			getProductList(){
				this.$request.post({url:'/product/getValidateProducts'}).then(res => {
					this.productList = res.data;
					this.filterProductList = this.productList;
				})
			},
			filterProduct(e){
				let input = e.detail.value;
				this.filterProductList = this.productList.filter(p => p.productDescription.indexOf(input) !== -1);
			},
			// 选择产品
			changeProduct(e){
				let index  = e.currentTarget.dataset.index;
				const product = this.filterProductList[index]
				this.productName = `${product.productDescription}`;
				this.goods = {
					productName: product.name  || null, // 产品名称
					productNo: product.productNo || null, // 产品编号
					productId: product.id || null, // 产品ID
					requirement:product.requirement || null , // 要求
					width: product.width || null, // 宽度
					weight: product.weight || null, // 克重
					length: product.length || null, //米数
					goodsLength: 1, // 长度
					goodsNumber:1 , // 下单数量/条数
					price:product.price ||  null, // 单价
					remark:product.remark || null, // 备注
				};
				this.hideModal();
			},
			// 选择订单类型
			changeOrderType(e){
				this.orderInfo.orderType = this.orderTypeList[e.detail.value].id;
				this.orderTypeName = this.orderTypeList[e.detail.value].name;
				this.orderInfo.orderExts = []; // 清空产品
			},
			// 显示添加产品的modal
			showAddProductModal(e){
				// this.createFormId(e.detail.formId)
				this.productName = '请选择产品';
				this.goods = {};
				this.showBottomModal = !this.showBottomModal;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 将产品追加到产品列表里面去
			pushGoods(e){
				this.createFormId(e.detail.formId)
				if(!this.goods.productId){
					// 调手机震动
					uni.vibrateLong({});
					// 弹出错误提示
					uni.showToast({
						title: '请选择产品',
						icon: 'none',
						duration: 2000,
					})
					return
				}
				this.orderInfo.orderExts.push(this.goods)
				this.showBottomModal = !this.showBottomModal;
			},
			// 删除产品
			removeGoods(index){
				this.orderInfo.orderExts.splice(index, 1)
			},
			// 保存
			saveOrderInfo(){
				if(!this.validate()) {
					// 调手机震动
					uni.vibrateLong({});
					return 
				}
				this.submitting = !this.submitting 
				this.$request.post({
					url:'/order/draftOrder',
					loadingTip: '正在保存数据...',
					data: this.orderInfo
				}).then(res =>{
					this.submitting = !this.submitting 
					uni.showToast({
						duration: 3000,
						title: res.message,
						icon: res.code === 10000 ? "success": "none",
						success: ()=> {
							if(res.code === 10000){
								uni.navigateBack({});
							}
						}
					})
				}).catch(err => {
					this.submitting = !this.submitting 
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			},
			// 保存并提交
			saveOrSubmmit(e){
				if(!this.validate()) {
					// 调手机震动
					uni.vibrateLong({});
					return 
				}
				this.submitting = !this.submitting 
				this.$request.post({
					url:'/order/createOrder',
					loadingTip: '正在保存数据...',
					data: { formId : e.detail.formId, ...this.orderInfo }
				}).then(res =>{
					this.submitting = !this.submitting 
					uni.showToast({
						duration: 3000,
						title: res.message,
						icon: res.code === 10000 ? "success": "none",
						success: ()=> {
							if(res.code === 10000){
								uni.navigateBack({});
							}
						}
					})
				}).catch(err => {
					this.submitting = !this.submitting 
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			},
			// 验证数据
			validate(){
				if(!this.orderInfo.orderExts.length){
					uni.showToast({
						duration: 3000,
						title: '请添加产品！',
						icon: "none",
					})
					return false;
				}else if(!this.orderInfo.address){
					uni.showToast({
						duration: 3000,
						title: '请输入收货地址！',
						icon: "none",
					})
					return false;
				}else if(!this.orderInfo.customerName){
					uni.showToast({
						duration: 3000,
						title: '请输入收货人！',
						icon: "none",
					})
					return false;
				}else if(!this.orderInfo.phone){
					uni.showToast({
						duration: 3000,
						title: '请输入收货人电话！',
						icon: "none",
					})
					return false;
				}
				return true
			},
			// 获取地理位置
			getLocation(){
				uni.chooseLocation({
					success: res => {
						this.orderInfo.address = res.address
					}
				})
			},
			// 创建formId
			createFormId(formId){
				this.$request.post({ url:`/common/generateFormId/${formId}`})
			}
		}
	}
</script>

<style>
	page {
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		width: 100vw;
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	
	textarea{
		padding: 0!important;
		min-height: 70px;
		margin: 26rpx auto;
	}
	picker {
		.picker {
			text-align: left;
		}
		
		&.product-type:after {
			width: 40rpx;
			padding-right: 18px;
		}
	}
	button[form-type=submit]{
		margin-bottom: 100rpx;
	}
	.h45{
		height: 45upx;
		line-height: 45upx;
	}
	.mb0{
		margin-bottom: 0upx!important;
	}
	
	
	.cu-bar.search {
		box-shadow: none;
	}
	.productslist.cu-list.menu>.cu-item {
		min-height: 75upx;
	}
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 35upx 0;
	}
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.7));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	.DrawerPage .nav {
		flex: 1;
	}
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
