<template>
	<view>
		<view class="page bg-white">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/index.jpg" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">登录</block>
			</cu-custom>

			<view class="h200 margin-xl flex justify-center logo">
				<image src="http://6776615.s21i.faiusr.com/4/ABUIABAEGAAgqMGPxQUozqiK3gUwsQ84rQ8.png" class="png" mode="widthFix"></image>
			</view>

			<view class="login">
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-people padding-right margin-right solid-right"></text>
					<input type="text" placeholder="请输入用户名" maxlength="30" v-model="user.userName" />
				</view>
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-lock padding-right margin-right solid-right"></text>
					<input type="password" placeholder="请输入密码" maxlength="30" v-model="user.password" />
				</view>

				<view class="margin-sm padding-sm">
					<button :disabled="loding" class="cu-btn block bg-gradual-green margin-tb-sm lg round" @click="doLogin">
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
					userName: '',
					password: ''
				},
				loding: false
			}
		},
		methods: {
			doLogin() {
				this.loding = !this.loding
				uni.request({
					url: 'https://www.qitong-tech.com/iot-backend/login/login',
					method: 'POST',
					data: {
						username: this.user.userName,
						password: this.user.password
					},
					success: res => {
						if (res.data.code === 10000) {
							// 登录成功！
							uni.navigateTo({
								url: '/pages/user/info/info'
							});
						} else {
							// 掉手机震动
							uni.vibrateLong({});
							// 弹出错误提示
							uni.showToast({
								title: `${res.data.message} 请与管理员联系`,
								icon: 'none',
								duration: 2000,
							})
						}
					},
					fail: err => {
						console.log(err)
					},
					complete: () => {
						this.loding = !this.loding
					}
				});
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
