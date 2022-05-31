<template>
	<view>
		<view class="bg-white">
			<cu-custom bgColor="bg-purple" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">个人信息</block>
			</cu-custom>
			<view class="margin-xl flex justify-center">
				<view class="cu-avatar xl round margin-left" v-if="userInfo == null || userInfo.avatar == null"
					style="background-image:url(http://yase.cn-sh2.ufileos.com/index2.jpg);"></view>
				<view class="cu-avatar xl round margin-left" v-else
					:style="'background-image:url('+userInfo.avatar+');'"></view>
			</view>
			<view class="flex justify-center text-xl text-bold">{{userInfo.userName}}</view>
			<view class="flex justify-center margin-top">{{userInfo.phone}}</view>
			<!-- <button class="flex margin-top syncinfo cu-btn shadow bg-olive" open-type="getUserInfo" @getuserinfo="getUserInfo">获取个人信息</button> -->
			<view class="h80"></view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 基本信息
			</view>
			<!-- <view class="action">
				<navigator class="cu-btn bg-green shadow modifyNav" url="/pages/login/login">修改abc</navigator>
			</view> -->
		</view>

		<view class="cu-list menu card-menu margin-top margin-bottom-xl shadow-lg radius">
			<view class="cu-item ">
				<view class="content">
					<text class="text-green">姓名：</text>
					<text class="text-grey">{{userInfo.userName}} </text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="text-green">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</text>
					<text class="text-grey">{{userInfo.job.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-green">部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</text>
					<text class="text-grey">{{userInfo.department.departmentName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-green">公司名称：</text>
					<text class="text-grey padding-right-sl">{{userInfo.companyName || ""}}</text>
					<block v-if="userInfo.organization.orgName">
						<text class="cu-tag line-green sm margin-top-xs" v-if="userInfo.authStatus == 1">已认证</text>
						<text class="cu-tag line-gray sm margin-top-xs" v-else>未认证</text>
					</block>
				</view>
			</view>
		</view>

		<view class="padding flex flex-direction btn-position">
			<button class="cu-btn bg-gradual-orange lg" @tap="unbind">退出/注销</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync("user")
			}
		},
		onShow() {
			this.$request.post({
				url: "/user/getUserBySessionKey",
			}).then(res => {
				this.userInfo = res.data;
				uni.setStorageSync('user', res.data);
			})
		},
		methods: {
			getUserInfo(e) {
				if (!e.detail) return;
				let info = e.detail.userInfo;
				this.userInfo.avatar = info.avatarUrl;
				this.userInfo.userName = info.nickName;
				this.userInfo.gender = info.gender;
				console.log("e", e.detail);
				console.log(this.userInfo)
				this.$request.post({
					url: "/user/saveUser",
					data: this.userInfo,
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.message,
						icon: res.code === 10000 ? "" : "none"
					})
				})
			},
			unbind(e) {
				this.$request.post({
					url: '/user/unbindMiniSessionKey',
				}).then(res => {
					uni.showToast({
						title: res.message,
						icon: res.code === 10000 ? "success" : "none",
						success: () => {
							uni.setStorageSync('registerFlag', false);
							setTimeout(() => {
								if (res.code === 10000) {
									uni.reLaunch({
										url: '/pages/login/login',
									})
								}
							}, 1000);
						}
					})
				})
			}
		},
		computed: {
			id2corp() {
				return (this.userInfo && this.userInfo.companyName && this.userInfo.identityCard);
			}
		},

	}
</script>

<style lang="scss" scoped>
	.h300 {
		height: 300upx;
	}

	.h80 {
		height: 80upx;
	}

	.syncinfo {
		margin: 15px auto 2px;
		width: 140px;
	}

	.content {
		display: flex;

		.text-green {
			display: flex;
			min-width: 75px;
		}
	}

	.modifyNav {
		border-radius: 5px;
	}

	.btn-position {
		width: 100%;
		position: fixed;
		bottom: 65upx;
		z-index: 10;
	}
</style>
