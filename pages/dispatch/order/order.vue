<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">配送订单</block>
		</cu-custom>

		<map style="width: 100VW; height: 100VH;" :latitude="mapComponent.lat" :longitude="mapComponent.lng"
			:markers="mapComponent.markers" :polyline="mapComponent.polyline" :show-location="true">
		</map>

	</view>
</template>

<script>
	// const amapFile = require('../../../lib/amap/amap-wx.130.js')
	export default {
		data() {
			return {
				mapComponent: {
					lat: '27.550614',
					lng: '120.547986',
					markers: [{
						label: {
							content: '亚迦布科技（起点）',
							color: '#F40F40'
						},
						latitude: 27.525621,
						longitude: 120.426486,
						iconPath: 'https://manage.agabus.shop/static/img/agabus.338c13a6.png',
						width: 48,
						height: 48,
					}],
					polyline: [],
				},
				distance: 0,
			}
		},
		onLoad() {
			this.getLocation();
		},
		methods: {
			// 获取定位
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.mapComponent.lat = res.latitude;
						this.mapComponent.lng = res.longitude
					}
				})
			},


			// 获取线路规划
			getRoute(origin, destination) {
				let that = this
				if (origin && destination) {
					this.amapwx.getDrivingRoute({
						origin: origin,
						destination: destination,
						success: function(data) {
							var points = [];
							if (data.paths && data.paths[0] && data.paths[0].steps) {
								var steps = data.paths[0].steps;
								for (var i = 0; i < steps.length; i++) {
									var poLen = steps[i].polyline.split(';');
									for (var j = 0; j < poLen.length; j++) {
										points.push({
											longitude: parseFloat(poLen[j].split(',')[0]),
											latitude: parseFloat(poLen[j].split(',')[1])
										})
									}
								}
							}
						}
					})
				}
			}
		}
	}
</script>

<style>

</style>
