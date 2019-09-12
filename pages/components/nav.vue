<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-green"></text> 功能分布
			</view>
		</view>
		<view class="cu-card case no-card">
			<view class="cu-item shadow pt30">
				<view class="nav-list">
					<view hover-class="none" class="nav-li" navigateTo :class="'bg-'+item.color" @click="NavChange" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
					 v-for="(item,index) in elements" :key="index" :data-cur="item.page">
						<view class="nav-title">{{item.title}}</view>
						<view class="nav-name">{{item.name}}</view>
						<text :class="'cuIcon-' + item.cuIcon"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCard: false,
				elements: [{
						title: '报表',
						name: '销售报表',
						color: 'green',
						cuIcon: 'rank',
						page: '/pages/report/report'
					}, {
						title: '审核 ',
						name: '审核管理',
						color: 'olive',
						cuIcon: 'roundcheck',
						page: '/pages/examine/examine'
					}, {
						title: '订单',
						name: '订单状态',
						color: 'cyan',
						cuIcon: 'text',
						page: '/pages/order/index'
					},
					{
						title: '产品',
						name: '产品库存',
						color: 'blue',
						cuIcon: 'pic',
						page: '/pages/product/product'
					},
					{
						title: '我的',
						name: '个人信息',
						color: 'purple',
						cuIcon: 'my',
						page: '/pages/login/login'
					},
					{
						title: '回馈',
						name: '在线回馈',
						color: 'mauve',
						cuIcon: 'comment',
						page: '/pages/feedback/feedback'
					}
				]
			}
		},
		methods: {
			NavChange(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.cur
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.cu-bar {
		margin: 10upx 0 0;
	}

	.pt30 {
		padding-top: 30upx;
	}

	.h91 {
		height: 91upx;
	}
</style>
