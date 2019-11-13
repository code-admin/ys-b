<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">{{directJump ? '首页' : '返回'}}</block>
			<block slot="content">反馈详情</block>
		</cu-custom>

		<view class="fb-content margin-bottom-xl" v-if="feedback.historyList && feedback.historyList.length > 0" >
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 回馈信息
				</view>
			</view>
			<view class="bg-white margin-top">
				<view class="cu-timeline">
					<view :class="{ 'cu-item': true, 'text-blue': index == 0 }" :key="index" v-for="(history, index) in feedback.historyList">
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
		
		<view class="fb-content margin-bottom-xl">
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 反馈信息
				</view>
			</view>
			<view class="cu-item flex align-center">
				<view class="title text-grey padding-sm">问题类型：</view>
				<view class="cu-tag light bg-orange radius padding-sm">{{feedback.questionTypeName || ''}}</view>
			</view>
			<!-- <view class="cu-item flex">
				<view class="title text-grey padding-sm">问题标题：</view>
				<view class="padding-sm">{{feedback.questionName || ''}}</view>
			</view> -->
			<view class="cu-item flex align-start">
				<view class="title text-grey padding-sm">问题描述：</view>
				<view class="padding-sm">{{feedback.description || ''}}</view>
			</view>
			
			
			<view class="cu-item flex align-start">
				<view class="title text-grey padding-sm">图片预览：</view>
			</view>
			<view class="cu-item flex align-start padding-sm">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in feedback.files" :key="index" @tap="viewImage" :data-url="item">
					 <image :src="item" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 客户信息
				</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">客户名称：</view>
				<view class="padding-sm">{{feedback.customerName || ''}}</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">联系电话：</view>
				<view class="padding-sm">{{feedback.phone || ''}}</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 订单信息
				</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">关联订单：</view>
				<view class="padding-sm">{{feedback.orderNo || ''}}</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">产品名称：</view>
				<view class="padding-sm">{{productName || ''}}</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">要&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;求：</view>
				<view class="padding-sm">{{feedback.requirement || ''}}</view>
			</view>
			
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</view>
				<view class="padding-sm">{{feedback.width|| ''}}(cm)</view>
				<view class="title text-grey padding-sm">克&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重：</view>
				<view class="padding-sm">{{feedback.weight || ''}}(g)</view>
			</view>
			<view class="cu-item flex">
				<view class="title text-grey padding-sm">个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</view>
				<view class="padding-sm">{{feedback.number || ''}}</view>
			</view>
			<view class="cu-item flex padding-bottom-xl">
				<view class="title text-grey padding-sm">机&nbsp;&nbsp;台&nbsp;&nbsp;号：</view>
				<view class="padding-sm">{{feedback.deviceNo || ''}}</view>
				<view class="title text-grey padding-sm">生产日期：</view>
				<view class="padding-sm">{{feedback.productDate||''}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback: {},
				feedbackId: null,
				directJump: false,
			}
		},
		onLoad(options) {
			this.directJump = getCurrentPages().length == 1;
			this.feedbackId = options.feedbackId;
			this.queryFeedback();
		},
		methods: {
			queryFeedback(){
				this.$request.post({
					url: "/feedback/getFeedbackById/" + this.feedbackId
				}).then(res =>{
					this.feedback = res.data
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.feedback.files,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.fb-content{
		background-color: white;
	}
	.cu-item {
		.text-grey {
			display: flex;
			// flex-basis: 65px;
			white-space: nowrap;			
			justify-content: space-between;
			&+.padding-right-xl,&+.padding-right-xs{
				min-width: 75px;
			}
		}
	}

</style>
