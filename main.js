import Vue from 'vue'
import App from './App'

import request from './lib/j-request/request.js'
var baseUrl = 'https://mini.api.melender.cn/yase-miniprogram/'
// #ifdef H5
baseUrl = '/yase-miniprogram/'
// #endif
request.setConfig({   
	baseUrl: baseUrl,
	debug: false,
	business: undefined
})
// 请求拦截
request.interceptor.request = (config => {
    // 给data添加全局请求参数uid    
	if (!config.data.uid) {
		config.data.uid = 100    
	}    
	// 给header添加全局请求参数token    
	if (!config.header.token) {
		config.header['YS-USER-TOKEN-ID'] = uni.getStorageSync("sessionKey");
	}   
	// 添加一个自定义的参数，默认异常请求都弹出一个toast提示    
	if (config.toastError === undefined) {
		config.toastError = true    
	}    
	return config;
})

// 全局的业务拦截
request.interceptor.response = ((res, config) => {
    if (res.code === 10000) {
		res.success = true;
	} else if(res.code === 10001){
		uni.showToast({ icon: "none", title: res.message, duration: 2000})
	} else if (res.code === 50004) {
	    uni.setStorageSync('openId', res.data.openId);
	    uni.setStorageSync('sessionKey', res.data.sessionKey);
	    uni.setStorageSync('registerFlag', res.data.registerFlag);
		uni.navigateTo({
		   url: '/pages/loign/login'
		})
	}
	// else if (res.code === 50001) {
 //        // token失效，需要重新登录
 //        uni.navigateTo({
 //            url: '/pages/loign/login'
 //        })
 //    }
	return res;
})

// 全局的错误异常处理
request.interceptor.fail = ((res, config) => {
	let ret = res;    let msg = ''
	if (res.statusCode === 200) { 
		// 业务错误 
		msg = res.data.message
		ret = res.data
	} else if (res.statusCode > 0) { 
		// HTTP错误 
		msg = '服务器异常[' + res.statusCode + ']'
	} else {
		// 其它错误
		msg = res.errMsg
	} 
	if (config.toastError) {
		uni.showToast({
			title: msg, 
			duration: 2000, 
			icon: 'none' ,
		}) 
	} 
	return ret;
})

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

/** 
* Assign the request to global VUE.
* @param {Request} $request - The request object.
*/
Vue.prototype.$request = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



