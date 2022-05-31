<template>
	<view>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'Banner',
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://6776615.s21i.faiusr.com/2/ABUIABACGAAgtMiPxQUo6t3y_wUwwAc4zAM.jpg',
					// url: '/static/BasicsBg.png'
				}, {
					id: 1,
					type: 'image',
					url: 'http://6776615.s21i.faiusr.com/2/ABUIABACGAAg2MuPxQUohJ2WfjDABziIBA.jpg',
					// url: '/static/componentBg.png'
				}],
				dotStyle: true
			};
		},
		
		onLoad() {
			this.getBannerList();
		},
		
		methods:{
			getBannerList(){
				this.$request.post({
					data: {},
					loadingTip: '加载中...',
					url: "index/getBannerList"
				}).then(res => {
					if(res.data.length){
						this.feedbackList = res.data ;
					}
				}).catch(() =>{
					console.log('banner loading err!!!!')
				})
			}
		}
	}
</script>

<style>

</style>
