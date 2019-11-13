<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品</block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-bar bg-white search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="filter.keywords" @confirm="initData" :adjust-position="false" type="text" 
						placeholder="产品编号、名称、要求、宽度、克重" confirm-type="search"></input>
				</view>
				<view class="action" >
					<view class="margin-tb-sm text-center">
						<button class="cu-btn round bg-cyan shadow" @click="initData">搜索</button>
					</view>
				</view>
			</view>
		</scroll-view>
		<goods v-for="(goods,index) in dataList" :key="index" :option="goods"></goods>
		<view class="empty-data" v-if="!isLoading && dataList.length == 0">暂无数据</view>
		<view class="text-center padding" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import Goods from './goods'
	export default {
		components: {
			Goods
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				filter:{
					keywords:null,
					status:1,
					pageIndex:1,
					pageSize: 10
				},
				total:0,
				isLoading: false,
				loadedNumber: 0,
				showLoadMore: false,
				loadMoreText: "加载中...",
				dataList: [],
			}
		},
		onLoad() {
			this.initData();
		},
		onUnload() {
			this.total = 0,
			this.dataList = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onPullDownRefresh() {
			this.initData();
		},
		onReachBottom() {
			console.log("onReachBottom",this.loadedNumber);
			if (this.loadedNumber >= this.total) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.filter.pageIndex ++;
				this.getDataList();
			}, 300);
		},
		methods: {
			initData(){
				this.loadedNumber = 0;
				this.dataList = [];
				this.filter.pageIndex = 1;
				this.loadMoreText = "加载更多";
				this.showLoadMore = false;
				this.getDataList();
			},
			getDataList() {
				this.isLoading = true;
				this.$request.post({
					data:this.filter,
					loadingTip: '加载中...',
					url:'/product/getProductList',
				}).then(res => {
					this.isLoading = false
					this.total = res.total;
					this.loadedNumber += this.filter.pageSize;
					this.dataList = this.dataList.concat(res.data) ;
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style>
	page {
		padding-top: 45px;
	}
</style>
