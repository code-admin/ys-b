<template>
	<view>
		<view class="page bg-white">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/index.jpg" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">注册&绑定</block>
			</cu-custom>

			<view class="h200 margin-xl flex justify-center logo">
				<image src="http://6776615.s21i.faiusr.com/4/ABUIABAEGAAgqMGPxQUozqiK3gUwsQ84rQ8.png" class="png" mode="widthFix"></image>
			</view>
			
			<view class="login">
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-mobile padding-right margin-right solid-right"></text>
					<input type="text" placeholder="请输入手机号码" maxlength="30" v-model="user.phone" />
					<button class="cu-btn bg-green" open-type="getPhoneNumber" @getphonenumber="fillMobile">获取手机号</button>
				</view>
				<view class="margin padding-sm solid line-green round flex justify-start align-center">
					<text class="lg text-grey cuIcon-lock padding-right margin-right solid-right"></text>
					<input type="text" placeholder="请输入验证码" maxlength="30" v-model="user.smsCode" />
					<button class="cu-btn bg-green" @click="sendSms" :disabled="countdown < 60">{{smsCodeText}}</button>
				</view>

				<view class="margin-sm padding-sm">
					<button :disabled="loding" class="cu-btn block bg-gradual-green margin-tb-sm lg round" @click="doRegister">
						<text v-if="loding" class="cuIcon-loading2 cuIconfont-spin"></text>注 册
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let countdownSeconds = 60;
	const WXBizDataCrypt = require('../../lib/datacrypt/datacrypt');
	export default {
		data() {
			return {
				countdown: countdownSeconds,
				smsCodeText:'发送验证码',
				user: {
					openId:uni.getStorageSync('openId'),
					phone:null,
					smsCode:null,
				},
				loding: false
			}
		},
		methods: {
			fillMobile(e){
				var appId = 'wx597ea283da1328db';
				let {encryptedData, iv} = e.detail;
				if(encryptedData) {
					let sessionKey = uni.getStorageSync('sessionKey');
					var pc = new WXBizDataCrypt(appId, sessionKey);
					var data = pc.decryptData(encryptedData , iv);
					console.log('DataCrypt content: ', data);
					if (data) {
						this.user.phone = data.phoneNumber;
					}
				}
			},
			sendSms() {
				if(this.user.phone == null){
					return uni.showToast({ icon: "none", title: "请输入手机号码" });
				}
				this.settingCodeText();
				this.$request.post({
					url: '/login/sendMessage',
					data:{
						appId: 'YS_562614a2053a4b9f9d3946c1e4632636',
						secretKey:	'YS_e5f543dd8365489c9f3426d9f715a8ca',
						phone:	this.user.phone
					}
				}).then(res => {
					console.log(res);
					uni.showToast({
						icon: res.code === 10000 ? "success": "none",
						title: res.message
					})
				})
			},
			settingCodeText(){
				this.countdown--
				if(this.countdown > 0){
					setTimeout(this.settingCodeText,1000);
				} else {
					this.countdown = countdownSeconds;
				}
				this.smsCodeText = this.countdown == countdownSeconds ? "发送验证码" : this.countdown + " 秒后可用"
			},
			doRegister() {
				if(this.user.phone == null || this.user.smsCode == null) {
					return uni.showToast({ icon: "none", title: "请填写完整信息" });
				}
				this.loding = !this.loding
				this.$request.post({
					url:'/login/bindUser',
					data: this.user
				}).then(res => {
					this.loding = !this.loding;
					uni.showToast({
						duration: 3000, 
						title: res.message,
						icon: res.code === 10000 ? "success": "none",
						success: ()=> {
							uni.setStorageSync('registerFlag', true);
							setTimeout(() =>{
								if(res.code === 10000){
									uni.navigateTo({
										url: '/pages/index/index',
									})
								}
							}, 1000);
						}
					})
				}).catch(err => {
					this.loding = !this.loding;
					uni.showToast({
						duration: 3000,
						title: err.message,
						icon:"none",
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
