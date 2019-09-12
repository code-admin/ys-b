<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">反馈</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabs[index]}}
			</view>
		</scroll-view>

		<feedback-card v-for="(item,index) in feedbackList" :key="index"></feedback-card>
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
				tabs: [
					'全部',
					'待回馈',
					'已回馈'
				],
				feedbackList: [{}, {}, {}, {}]
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
