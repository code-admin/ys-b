<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<image src="http://6776615.s21i.faiusr.com/4/ABUIABAEGAAgqMGPxQUozqiK3gUwsQ84rQ8.png" class="png" mode="widthFix"></image>
				<!-- <view class="text-xl">ColorUI组件库
					<text class="text-df">v2.0</text>
				</view> -->
				<view class="margin-top-sm">
					<text>卓钧</text>
				</view>
				<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>

			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow" @click="HandAuth">
					<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
						<text class="cuIcon-profile text-orange"></text>
						<text class="text-grey">绑定登录 / 解除绑定</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/about/about" hover-class="none">
						<text class="cuIcon-edit text-blue"></text>
						<text class="text-grey">意见反馈</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/log/log" hover-class="none">
						<text class="cuIcon-service text-green"></text>
						<text class="text-grey">服务与帮助</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/log/log" hover-class="none">
						<image src="/static/ys_logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">关于</text>
					</navigator>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "User",
		data() {
			return {
				starCount: 0,
				forksCount: 0,
				visitTotal: 0,
			}
		},
		methods: {
			HandAuth(){
				// 跳转路由
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style>
	.UCenter-bg {
		background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
		background-size: cover;
		height: 550upx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}
</style>
