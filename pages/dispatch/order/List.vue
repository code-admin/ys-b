<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">配送订单</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabs" :key="index"
				@tap="tabSelect" :data-id="index">
				{{tabs[index]}}
			</view>
		</scroll-view>

		<view>
			<order-item v-for="(item,index) in orderList" :key="index" :card="item"></order-item>
		</view>

		<view class="empty-data" v-if="!isLoading && orderList.length == 0">暂无数据</view>
		<view class="text-center text-gray padding" v-if="showLoadMore">{{loadMoreText}}</view>

	</view>
</template>

<script>
	import OrderItem from '../common/OrderItem.vue'
	export default {
		components: {
			OrderItem
		},
		data() {
			return {
				TabCur: 1,
				CustomBar: this.CustomBar,
				tabs: ['全部', '待抢单', '进行中', '已完成'],
				queryParams: {
					status: 1,
					pageIndex: 1,
					pageSize: 5,
				},
				total: 0,
				isLoading: false,
				loadedNumber: 0,
				showLoadMore: false,
				loadMoreText: "加载中...",
				orderList: []
			};
		},
		// created() {
		// 	this.initData();
		// },
		onLoad() {
			uni.$on("eceiveDeliverCallBack", (id) => {
				this.orderList = this.orderList.filter((item) => item.id !== id)
			})
		},
		onShow() {
			uni.getLocation({
				type:'gcj02',
				success: res => {
					this.queryParams.origin=`${res.longitude},${res.latitude}`
					this.initData();
				}
			})
		},
		onUnload() {
			this.total = 0
			this.orderList = []
			this.loadMoreText = "加载更多..."
			this.showLoadMore = false
		},
		onPullDownRefresh() {
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
				this.queryParams.pageIndex++;
				this.getDataList();
			}, 300);
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.queryParams.status = this.TabCur ? this.TabCur : null
				this.initData();
			},
			initData() {
				this.loadedNumber = 0;
				this.orderList = [];
				this.queryParams.pageIndex = 1;
				this.loadMoreText = "加载更多...";
				this.showLoadMore = false;
				this.getDataList();
			},
			getDataList() {
				this.isLoading = true;
				this.$request.post({
					data: this.queryParams,
					loadingTip: '加载中...',
					url: "deliver/list"
				}).then(res => {
					this.isLoading = false;
					this.total = res.total;
					this.loadedNumber += this.queryParams.pageSize;
					this.orderList = this.orderList.concat(res.data);
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
</style>
