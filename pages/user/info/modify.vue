<template>
	<view>
		<view class="bg-white">
			<cu-custom bgImage="https://image.weilanwl.com/color2.0/index.jpg" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">修改个人信息</block>
			</cu-custom>
		</view>

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">真实姓名</view>
				<input v-model="userInfo.userName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input v-model="userInfo.phone" placeholder="手机号码"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</view>
				<picker @change="pickerChange" v-model="userInfo.gender" :range="picker">
					<view class="picker">{{picker[userInfo.gender]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input v-model="userInfo.identityCard" placeholder="请输入身份证号码"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">公司名称</view>
				<input v-model="userInfo.companyName" placeholder="请输入公司全名称"></input>
			</view>
			
			<button class="cu-btn shadow margin bg-olive block lg" @click="saveUser">保存</button>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: ['未知','男', '女'],
				userInfo: {}
			}
		},
		created() {
			this.$request.post({
				url: "/user/getUserBySessionKey",
			}).then(res => {
				console.log(res.data)
				if(res.code === 10000){
					this.userInfo = res.data;
					uni.setStorageSync('user',res.data);
				}
			});
		},
		methods: {
		  pickerChange(e) {
			console.log(e.detail);
			this.userInfo.gender =  e.detail.value;
		  },
		  saveUser(){
			  this.$request.post({
			  	url: "/user/saveUser",
			  	data: this.userInfo,
			  }).then(res => {
				  if(res.code === 10000){
					  uni.showToast({
						mask: true,
					  	title: "修改成功",
						complete: ()=>{
							setTimeout(()=>{
								// uni.navigateTo({
								// 	url: "/pages/user/info/info"
								// })
								uni.navigateBack({});
							}, 500);
						}
					  })
				  } else {
					uni.showToast({
						icon: "none",
						title: res.message
					})  
				  }
			  })
		  }
		}
	}
</script>

<style>
view.title{
	color:#8799A3;
}
</style>
