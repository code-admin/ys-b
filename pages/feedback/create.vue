<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">问题反馈</block>
		</cu-custom>
	
		<form @submit="preSumit" report-submit class="block padding-bottom-xl">
			
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 反馈信息
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="title text-grey">问题类型</view>
				<picker name="questionType" @change="pickerType" :range="questionTypeList" range-key="questionName">
					<view class="picker">{{questionTypeName}}</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title text-grey">问题标题</view>
				<input name="questionName" placeholder="请输入问题标题" v-model="question.questionName"></input>
			</view> -->

			<view class="cu-form-group align-start">
				<view class="title text-grey">问题描述</view>
				<textarea name="description" class="padding-0" v-model="question.description" maxlength="-1" auto-height></textarea>
			</view>
			<view class="cu-bar bg-white" style="margin-top: 1px;">
				<view class="action text-grey">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/{{maxImgCount}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 客户信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">客户名称</view>
				<input name="customerName" placeholder="请输入客户名称" v-model="question.customerName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">联系电话</view>
				<input name="phone" placeholder="请输入联系电话" v-model="question.phone"></input>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 订单信息
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">关联订单</view>
				<!-- <input name="orderId" placeholder="请输入订单编号" v-model="question.orderId"></input> -->
				<picker name="orderId" class="product-type" @change="pickerOrder" :range="orderList" range-key="orderNo">
					<view class="picker">{{orderName}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">产品名称</view>
				<picker name="productType" class="product-type" @change="pickerProductType" :range="productTypeList" range-key="name">
					<view class="picker">{{productName}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">要&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;求</view>
				<input name="requirement" placeholder="要求" v-model="question.requirement"></input>
			</view>

			<view class="cu-form-group">
				<view class="title text-grey">宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</view>
				<input name="width" type="number" placeholder="宽度(cm)" v-model="question.width"></input>
				<view class="title text-grey">克&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</view>
				<input name="weight" type="number" placeholder="克重(g)" v-model="question.weight"></input>
				<!-- <view class="title text-grey">长&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</view>
				<input name="length" type="number" placeholder="长度" v-model="question.length"></input> -->
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数</view>
				<input name="number" type="number" placeholder="个数" value="1" v-model="question.number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-grey">机&nbsp;&nbsp;台&nbsp;&nbsp;号</view>
				<input name="deviceNo" placeholder="机台号" v-model="question.deviceNo"></input>
				<view class="title text-grey">生产日期</view>
				<picker name="productDate" mode="date" @change="pickerDate" v-model="question.productDate">
					<view class="picker">{{question.productDate || '生产日期'}}</view>
				</picker>
			</view>
			
			<view class="cu-load load-modal bg-video" v-if="showUploadProgress">
				<view class="text-white">{{percentText}}</view>
			</view>
					
			<button class="cu-btn margin block shadow bg-orange lg" form-type="submit" :disabled="submitting">提交</button>
		</form>
	
	</view>
</template>

<script>
	let progress = [];
	export default {
		data() {
			return {
				maxImgCount: 4,
				imgList: [],
				percent: 0,
				serverFile: [],
				orderList: [],
				showUploadProgress: false,
				submitting: false,
				questionTypeList: [],
				productTypeList: [],
				question: {
					formId: null,
					questionName: "",
					questionType : null,
					productDate: null,
					productType: null,
					description: "",
					files: [],
					requirement: "",
					customerName: "",
					createBy: "",
					deviceNo: "",
					orderId: null,
					weight: "",
					width: "",
					number: "",
					length: "",
					questionName: "",
				}
			}
		},
		created() {
			this.queryTypeList();
			this.queryOrderList();
			this.queryProductTypeList();
		},
		methods: {
			queryTypeList(){
				this.$request.post({
					url: "/feedback/getFeedBackTypes"
				}).then(res =>{
					this.questionTypeList = res.data
				})
			},
			queryProductTypeList(){
				this.$request.post({
					url: "/product/getProductTypes"
				}).then(res =>{
					this.productTypeList = res.data
				})
			},
			queryOrderList(){
				this.$request.post({
					url: "/order/getOwnOrderList"
				}).then(res => {
					this.orderList = res.data
				});
			},
			preSumit(e){
				let formId = e.detail.formId;
				console.log("formId: ", formId);
				if(formId === "requestFormId:fail timeout"){
					return uni.showToast({ title: '请求超时，请再次尝试提交' });
				}
				if(this.question.questionType == null){
					return uni.showToast({ icon: 'none' ,title: '请选择反馈的问题类型' });
				}
				if(this.question.description.trim() == ""){
					return uni.showToast({ icon: 'none' ,title: '请输入问题描述' });
				}
				if(this.question.orderId == null){
					return uni.showToast({ icon: 'none' ,title: '请选择关联订单' });
				}
				if(this.question.deviceNo.trim() == ""){
					return uni.showToast({ icon: 'none' ,title: '请填写机台号' });
				}
				if(this.question.productDate.trim() == ""){
					return uni.showToast({ icon: 'none' ,title: '请选择生产日期' });
				}
				
				this.submitting = true;
				this.question.formId = formId;
				let imgCount = this.imgList.length;
				this.serverFile = [], this.question.files = [];
				// 有图片上传就先上传文件后，再提交表单数据 
				if(imgCount > 0){
					this.showUploadProgress = true;
					progress = new Array(imgCount).fill(0);
					// 微信上传文件不能批量只能一个一个文件上传，所以循环执行上传文件的异步请求
					let promiseMethod = new Array(imgCount);
					for(let i = 0; i < imgCount; i++) {
						promiseMethod[i] = this.uploadOnceFile(i);
					}
					Promise.all([...promiseMethod]).then(() => {
						console.log("all done..", this.serverFile);
						this.question.files = this.serverFile;
						this.showUploadProgress = false;
						this.formSubmit();
					}).catch((err) => {
						this.submitting = false;
						this.showUploadProgress = false;
						uni.showToast({ icon: 'none' ,title: err });
						console.error("[[err]]", err)
					});
				} else {
					this.formSubmit();
				}
			},
			async uploadOnceFile(i) {
				let imgCount = this.imgList.length;
				let baseUrl = this.$request.config.baseUrl
				return await new Promise((resolve, reject) => {
					let uploadTask = uni.uploadFile({
						name: 'file',
						filePath: this.imgList[i],
						url: baseUrl + '/common/uploadImage',
						success: res => {
							console.log("["+i+"] done ", this.serverFile);
							if(res.statusCode === 200){
								let result  = JSON.parse(res.data);
								this.serverFile[i] = result.data.url;
								resolve(result.data.url);
							} else {
								uploadTask.abort();
								this.submitting = false;
								this.showUploadProgress = false;
								let msg = res.statusCode === 413 ? "图片过大" : res.errMsg;
								uni.showToast({ icon: "none", title: msg });
								// reject(res);
							}
						},
						fail: (res) => {
							this.showUploadProgress = false;
							this.submitting = false;
							reject(res)
						}
					});
					uploadTask.onProgressUpdate(res => {
						// 更新上传的进度状态（百分比）
						progress[i] = res.progress;
						let sum  = progress.reduce((x,y)=> x+y);
						this.percent = parseInt(sum / imgCount);
					})
				});
			},
			formSubmit(){
				if(this.submitting && this.showUploadProgress) return;
				this.submitting = true;
				this.$request.post({
					data: this.question,
					loadingTip: "提交信息中...",
					url: '/feedback/createFeedback',
					fail: () => {
						this.submitting = false;
					},
					success: res => {
						this.submitting = false;
						uni.showToast({
							mask: true,
							duration: 2000,
							title: res.message,
							complete: () => {
								setTimeout(()=>uni.navigateTo({ url: "/pages/home/feedback/feedback" }), 1500);
							}
						});
					}
				})
			},
			pickerOrder(e){
				this.question.orderId = this.orderList[e.detail.value].id;
			},
			pickerType(e){
				this.question.questionType = this.questionTypeList[e.detail.value].id;
			},
			pickerDate(e){
				this.question.productDate = e.detail.value;
			},
			pickerProductType(e){
				this.question.productType = this.productTypeList[e.detail.value].id;
			},
			chooseImage() {
				uni.chooseImage({
					count: this.maxImgCount - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择或拍照
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						console.log(this.imgList);
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					content: '确定要删除当前照片吗？',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		},
		computed:{
			percentText(){
				return "上传中("+ this.percent + "%)";
			},
			orderName(){
				let orderId = this.question.orderId;
				let orderList = this.orderList || [];
				if(orderList.some(o => o.id === orderId)) {
					return orderList.find(o => o.id === orderId).orderNo;
				}
				return "请选择关联订单";
			},
			questionTypeName(){
				let questionType = this.question.questionType;
				let questionTypeList = this.questionTypeList || [];
				if(questionTypeList.some(type => type.id === questionType)) {
					return questionTypeList.find(type => type.id === questionType).questionName;
				}
				return "请选择类型";
			},
			productName(){
				let productType = this.question.productType;
				let productTypeList = this.productTypeList || [];
				if(productTypeList.some(type => type.id === productType)) {
					return productTypeList.find(type => type.id === productType).name;
				}
				return "选择品种";
			}
		}
	}
</script>

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
	.cu-load.load-modal{
		bottom: 0upx;
		background-color: rgba(0,0,0, .65);
		// box-shadow: 0 0 0upx 2000upx rgba(0, 0, 0, 0.5);
		box-shadow: none;
		&:after{
			background-color: transparent;
		}
	}
</style>
