<template>
	<view>
		<scroll-view scroll-y class="page">
			<banner></banner>
			<qt-nav></qt-nav>
		</scroll-view>
	</view>
</template>

<script>
	import Banner from '../components/banner.vue';
	import QtNav from '../components/nav.vue'
	export default {
		components: {
			Banner,
			QtNav
		},
		data() {
			return {

			}
		},
		mounted(){
			this.checkSession();
		},
		methods: {
			checkSession(){
				// 判断session 是否有效？ 
				// 若有效就直接获取用户数据信息
				// 否则 调用微信的登录接口
				wx.checkSession({
				  success:() => {
				    //session_key 未过期，并且在本生命周期一直有效
					console.log("Session key not expired", uni.getStorageSync("sessionKey"));
					// 通过sessionKey获取用户，若超时则自动登录
					this.$request.post({
						toastError: false,
						url: "user/getUserBySessionKey",
						success: res => {
							uni.setStorageSync('user',res.data);
						},
						fail: res => {
							if(res.code === 50000) {
								this.login();
							}
						}
					});
				  },
				  fail: err => {
				    // session_key 已经失效，需要重新执行登录流程
					console.log(err);
				    this.login() //重新登录
				  }
				})
			},
			// 获取通过 code openid & session_key
			login(){
				wx.login({
					// 登录成功 再通过 code 去获取 openId & sessionKey 以及用户数据和状态。
				  success:res => {
				    if (res.code) {
					  console.log('获取临时的code:',res.code);
					  this.code2Session(res.code)
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
			// 通过code 获取 openId & sessionKey
			code2Session(code){
				this.$request.get({
					url: `v1/sso/code2Session?code=${code}`,
					loadingTip: '正在获取身份验证...'
				}).then(res => {
					// 设置本地缓存
					console.log(res.code, res.message);
					uni.setStorageSync('openId', res.data.openId);
					uni.setStorageSync('sessionKey', res.data.sessionKey);
					uni.setStorageSync('registerFlag', res.data.registerFlag);
					uni.setStorageSync('user',res.data.user);
				})
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
		}
	}
</script>

<style>

</style>
