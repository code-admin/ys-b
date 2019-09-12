<template>
	<view>
		<view class="bg-white">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/index.jpg" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">个人信息</block>
			</cu-custom>
			<view class="margin-xl flex justify-center">
				<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			</view>
			<view class="flex justify-center text-xl text-bold">卓钧</view>
			<view class="flex justify-center margin-top">188 6210 8369</view>
			<view class="h80"></view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本信息
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="menuModal">修改</button>
			</view>
		</view>

		<view class="cu-list menu card-menu margin-top margin-bottom-xl shadow-lg radius">
			<view class="cu-item " @click="HandAuth">
				<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
					<text class="text-green">真实姓名：</text>
					<text class="text-grey">卓军</text>
				</view>
			</view>
			<view class="cu-item " @click="HandAuth">
				<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
					<text class="text-green">等级：</text>
					<text class="cuIcon-vip text-orange"></text>
					<text class="cu-tag round line-orange">超级客户</text>
				</view>
			</view>
			<view class="cu-item">
				<navigator class="content" url="/pages/about/about/about" hover-class="none">
					<text class="text-green">手机号：</text>
					<text class="text-grey">18862108369</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator class="content" url="/pages/about/log/log" hover-class="none">
					<text class="text-green">公司名称：</text>
					<text class="text-cut text-grey padding-right-sl">上海契通物联网科技有限公司</text>
					<text class="cu-tag line-green sm">已认证</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.h300 {
		height: 300upx;
	}

	.h80 {
		height: 80upx;
	}
</style>
