<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>

		<view class="map-box">
			<map id="map1" ref="map1" style="width:100vw;height:100vh;overflow: hidden;" v-if="showMap" :latitude="lat"
				:longitude="long" :markers="markers" :polyline="polyline" :show-location="true">
			</map>
		</view>


		<scroll-view scroll-y="true" class="detail-scroll padding">
			<view class="slider bg-white radius ">
				<view class="cu-bar solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-deliver_fill text-orange"> {{deliver.deliverNumber || ''}}</text>
					</view>
					<view class="action text-sm text-gray">{{deliver.createTime}}</view>
				</view>

				<view class="cu-steps steps-arrow margin">
					<view class="cu-item" :class="item.id > deliver.status ? '':'text-orange'"
						v-for="(item,index) in statusList" :key="index">
						{{item.name}}
					</view>
				</view>

				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">联系人：</view>
					<view class="padding-sm">{{deliver.createUser.userName || ''}}</view>
				</view>

				<view class="solid-bottom flex">
					<view class="title text-grey padding-sm">联系电话：</view>
					<view class="padding-sm">{{deliver.createUser.phone || ''}}</view>
				</view>

				<view class="solid-bottom flex justify-between">
					<view class="title text-grey padding-sm">取货地址：</view>
					<view class="padding-sm">{{deliver.shippingAddress.address || ''}}</view>
					<button class="cu-btn bg-orange sm round shadow" @click="goOrigin">导航</button>
				</view>
			</view>

			<!-- 关联订单 -->

			<view class="slider bg-white radius margin-top-sm">
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-fork text-orange">关联订单</text>
					</view>
				</view>
				<order-item :deliver="deliver" :order="order" :mapContext='mapContext'
					v-for="order in deliver.orderList" :key="order.id">
				</order-item>
			</view>

			<!-- 出库记录 -->

			<view class="slider bg-white radius margin-top-sm">
				<view class="cu-bar solid-bottom">
					<view class="action">
						<text class="cuIcon-squarecheckfill text-orange">出库记录</text>
					</view>
				</view>
				<view class="flex justify-start padding-sm text-sm" v-for="orderExpress in deliver.orderExpressList"
					:key="orderExpress.id">
					<view class="cu-tags radio sm light bg-orange"> {{orderExpress.orderId}} </view>
					<view class="margin-left text-yellow">{{`${orderExpress.productName}/${orderExpress.productNo}`}}
					</view>
					<view class="margin-left">x {{orderExpress.number}}</view>
					<view class="margin-left text-red">{{orderExpress.totalWeight}} KG </view>
				</view>
			</view>


			<view class="slider bg-white radius margin-top-sm">
				<view class="cu-bar solid-bottom ">
					<view class="action">
						<text class="cuIcon-timefill text-orange">流转信息</text>
					</view>
				</view>
				<view class="cu-timeline">
					<view class="cu-time"> 最新</view>
					<view class="cu-item cur" v-for="(itemTime,index) in deliver.histories" :key="index"
						:class="index===0 ? 'cuIcon-timefill text-orange':'' ">
						<view class="content shadow-blur text-sm" :class="index===0 ? 'bg-gradual-orange':'' ">
							<text class="padding-right-xl">{{itemTime.createTime}}</text> {{itemTime.remark}}
						</view>
					</view>
					<view class="cu-time ">...</view>
				</view>
			</view>

		</scroll-view>


		<view v-if="deliver.status === 5" class="padding fixed bottom-modal btn-position">
			<button class="cu-btn block bg-gradual-orange margin-tb-sm lg" @click="flnishOrder">完成</button>
		</view>

	</view>
</template>
<script>
	import OrderItem from './common/order-item.vue'
	export default {
		components: {
			OrderItem
		},
		data() {
			return {
				showMap: false,
				lat: null,
				long: null,
				markers: [],
				polyline: [],
				mapContext: null,

				statusList: [{
					id: 2,
					name: '接单'
				}, {
					id: 3,
					name: '出库'
				}, {
					id: 4,
					name: '配送'
				}, {
					id: 5,
					name: '签收'
				}, {
					id: 6,
					name: '完成'
				}],
				distance: null,
				cost: null,

				deliver: {}
			}
		},
		onLoad(options) {
			this.deliver.id = options.deliverId
			this.mapContext = uni.createMapContext('map1', this)
			// 获取当前定位，并规划订单线路。
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.long = res.longitude
					this.lat = res.latitude
					options.deliverId && this.getDetailById(options.deliverId)
				}
			})

			// 开始配送后回调！
			uni.$on("startDispatchingCallBack", (location, order) => {
				this.getDetailById(this.deliver.id)
			})
			uni.$on('goAddressCallBack', (latitude, longitude, destination) => {
				console.log(latitude, longitude, destination)

				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log(res)
						this.long = res.longitude
						this.lat = res.latitude
						this.getDrivingRoute(`${res.longitude},${res.latitude}`,
							`${longitude},${latitude}`,
							null)
					}
				})

				this.mapContext.openMapApp({
					latitude,
					longitude,
					destination,
					success: res => {
						console.log(res)
					}
				})
			})
		},
		methods: {
			getDetailById(deliverId) {
				this.markers = []
				this.$request.post({
					url: `deliver/detail/${deliverId}`
				}).then(res => {
					this.deliver = res.data
					this.markers = [{
						label: {
							content: '亚迦布科技（取货地）',
							color: '#F40F40'
						},
						latitude: this.deliver.shippingAddress.latitude,
						longitude: this.deliver.shippingAddress.longitude,
						iconPath: 'https://manage.agabus.shop/static/img/agabus.338c13a6.png',
						width: 60,
						height: 60

					}, ]
					this.showMap = true
					// 出发地
					const origin =
						`${this.deliver.shippingAddress.longitude},${this.deliver.shippingAddress.latitude}`
					// 目的地
					let destination = ''
					// 途径地，暂时无效。
					const opts = {
						waypoints: []
					}
					this.deliver.orderList.map((item, index) => {
						if (index) {
							opts.waypoints.push(`${item.longitude},${item.latitude}`)
						} else {
							destination = `${item.longitude},${item.latitude}`
						}
					})
					console.log('正在规划路线中……！')
					this.getDrivingRoute(origin, destination, opts)
				});
			},

			// 去仓库
			goOrigin() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log(res)
						this.long = res.longitude
						this.lat = res.latitude
						this.getDrivingRoute(`${res.longitude},${res.latitude}`,
							`${this.deliver.shippingAddress.longitude},${this.deliver.shippingAddress.latitude}`,
							null)
					}
				})
				this.mapContext.openMapApp({
					latitude: Number(this.deliver.shippingAddress.latitude),
					longitude: Number(this.deliver.shippingAddress.longitude),
					destination: this.deliver.shippingAddress.address,
					success: res => {
						console.log(res)
					}
				})
			},
			/**
			 * 获取路线规划
			 * @param {Object} origin
			 * @param {Object} destination
			 */
			getDrivingRoute(origin, destination, opts) {
				let that = this;
				that.$amapwx.getDrivingRoute({
					origin: origin,
					destination: destination,
					opts: opts,
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
						that.polyline = [{
							points: points,
							color: "#0091ff",
							arrowLine: true,
							width: 6
						}]
						that.distance = `${(data.paths[0].distance)/1000}(公里)`
						that.cost = parseInt(data.paths[0].duration / 60) + '分钟'
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},

			/**
			 * 完成订单
			 */
			flnishOrder() {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.long = res.longitude
						this.lat = res.latitude
					}
				})
				this.$request.post({
					url: `/deliver/finishDeliver/${this.deliver.id}`
				}).then(res => {
					uni.showToast({
						duration: 3000,
						title: res.message,
						icon: "success",
					})
					this.getDetailById(this.deliver.id)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100VH;

		.map-box {
			position: fixed;
			bottom: 0;
			left: 0;
			max-height: 100VH;
			overflow-y: hidden;
		}

		.detail-scroll {
			position: relative;
			top: 50vh;
			z-index: 1000;
		}

		// .info-body {
		// 	position: relative;
		// 	margin-left: 20rpx;
		// 	margin-right: 20rpx;
		// 	top: 50vh;
		// 	overflow-y: scroll;
		// 	z-index: 10;
		// }
	}

	.btn-position {
		width: 100%;
		position: fixed;
		bottom: 65upx;
		z-index: 200;
	}
</style>
