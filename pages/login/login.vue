<template>
	<view>
		<view class="page bg-white">
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">登录</block>
			</cu-custom>

			<view class="h200 margin-xl flex justify-center logo">
				<image src="http://asher.cn-sh2.ufileos.com/agabus.png" class="png" mode="widthFix"></image>
			</view>

			<view class="login">
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-people padding-right margin-right solid-right"></text>
					<input type="text" placeholder="请输入用户名" maxlength="30" v-model="user.username" />
				</view>
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-lock padding-right margin-right solid-right"></text>
					<input type="password" placeholder="请输入密码" maxlength="30" v-model="user.password" />
				</view>

				<view class="margin-sm padding-sm">
					<button :disabled="loding" class="cu-btn block bg-gradual-green margin-tb-sm lg round"
						@click="doLogin">
						<text v-if="loding" class="cuIcon-loading2 cuIconfont-spin"></text> 登录
					</button>
				</view>

				<!-- <view class="margin flex justify-end">
					<view class="text-grey solid-right text-lg margin-right">
						忘记密码 ？
					</view>
					<view class="text-green text-lg ">
						注册账号
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				},
				loding: false
			}
		},
		methods: {

			doLogin() {
				if (!this.user.username || !this.user.password) {
					// console.log('用户名或密码不能为空！')
					uni.vibrateLong({
						success: function () {
							console.log('用户名或密码不能为空!');
						}
					});
					uni.showToast({
						title: '用户名或密码不能为空!',
						duration: 3000,
						icon: "none",
					});
					return this.loding = false
				}
				this.$request.post({
					url: `login/login`,
					data: {
						openId: uni.getStorageSync('openId'),
						...this.user
					},
					loadingTip: '正在获取身份验证...'
				}).then(res => {
					console.log(res)
					uni.showToast({
						duration: 3000,
						title: res.message,
						icon: res.code === 10000 ? "success" : "none",
						success: () => {
							uni.setStorageSync('registerFlag', true);
							setTimeout(() => {
								if (res.code === 10000) {
									uni.navigateTo({
										url: '/pages/index/index',
									})
								}
							}, 1000);
						}
					})
				}).catch(err => {
					//TODO handle the exception
					this.loding = false
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon: "none",
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;

		.h200 {
			height: 200upx;
		}

		.logo {
			image {
				width: 200upx;
				height: 200upx;
			}
		}
	}
</style>
