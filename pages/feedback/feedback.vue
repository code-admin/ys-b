<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">反馈</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabs" 
			:key="index" @tap="tabSelect" :data-id="index">
				{{tabs[index]}}
			</view>
		</scroll-view>
		<navigator class="nav-position cu-btn shadow bg-gradual-orange radius text-sl" url="/pages/home/feedback/create">
			<text class="cuIcon-add"></text>
		</navigator>
		<feedback-card v-for="(item,index) in feedbackList" :key="index" :card="item"></feedback-card>
		<view class="empty-data" v-if="!isLoading && feedbackList.length == 0">暂无数据</view>
		<view class="text-center text-gray padding" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import FeedbackCard from './card'
	export default {
		components: {
			FeedbackCard
		},
		data() {
			return {
				TabCur: 0,
				CustomBar: this.CustomBar,
				tabs: [ '全部', '待反馈', '已反馈' ],
				queryParams: {
					pageIndex: 1,
					pageSize: 5,
					status: null,
				},
				total: 0,
				isLoading: false,
				loadedNumber: 0,
				showLoadMore: false,
				loadMoreText: "加载中...",
				feedbackList: [],
			}
		},
		created() {
			this.getFeedbackList();
		},
		onUnload() {
			this.total = 0,
			this.feedbackList = [],
			this.loadMoreText = "加载更多...",
			this.showLoadMore = false;
		},
		onPullDownRefresh(){
			this.initData();
		},
		onReachBottom() {
			console.log("onReachBottom", this.loadedNumber);
			if (this.loadedNumber >= this.total) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.queryParams.pageIndex ++;
				this.getFeedbackList();
			}, 300);
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.queryParams.status = this.TabCur === 0 ? null : this.TabCur - 1;
				this.initData();
			},
			initData(){
				this.loadedNumber = 0;
				this.feedbackList = [];
				this.queryParams.pageIndex = 1;
				this.loadMoreText = "加载更多...";
				this.showLoadMore = false;
				this.getFeedbackList();
			},
			getFeedbackList(){
				this.isLoading = true;
				this.$request.post({
					data: this.queryParams,
					loadingTip: '加载中...',
					url: "/feedback/getFeedBackList"
				}).then(res => {
					this.isLoading = false;
					this.total = res.total;
					this.loadedNumber += this.queryParams.pageSize;
					this.feedbackList = this.feedbackList.concat(res.data) ;
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	padding-top: 45px;
}
.nav-position{
	border-radius: 50%;
	width: 100upx;
	height: 100upx;
	position: fixed;
	right: 35upx;
	bottom: 65upx;
	z-index: 10;
}
</style>
