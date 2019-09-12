<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabs[index]}}
			</view>
		</scroll-view>
		<order-card v-for="(item,index) in orderList" :key="index"></order-card>
	</view>
</template>

<script>
	import OrderCard from './card.vue'
	export default {
		components: {
			OrderCard
		},
		data() {
			return {
				TabCur: 0,
				CustomBar: this.CustomBar,
				tabs: [
					'全部',
					'创建',
					'审核中',
					'出库',
					'结束'
				],
				orderList: [{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{}
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style>
	page {
		padding-top: 45px;
	}
</style>
