<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">审核</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabs[index]}}
			</view>
		</scroll-view>

		<examine-card v-for="(item,index) in orderList" :key="index"></examine-card>
	</view>
</template>

<script>
	import ExamineCard from './card.vue'
	export default {
		components: {
			ExamineCard
		},
		data() {
			return {
				TabCur: 0,
				CustomBar: this.CustomBar,
				tabs: [
					'全部',
					'待审核',
					'已审核',
					'已驳回'
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
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-top: 45px;
	}
</style>
