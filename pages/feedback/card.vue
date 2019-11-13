<template>
	<view>
		<navigator :url="'/pages/home/feedback/detail?feedbackId=' + card.id" hover-class="navigator-hover">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="flex solid-bottom padding justify-between align-center">
						<view class="text-cut text-black text-bold">{{card.description}}</view>
						<view class="cu-tag light bg-orange">{{card.questionTypeName}}</view>
					</view>
					<view class="padding">

						<view class="flex align-center">
							<view class="padding-right-xs text-grey">订单编号</view>
							<view class="padding-right-xl text-red">{{card.orderNo || ''}}</view>
						</view>
						<view class="content flex justify-between margin-top-xs">
							<view>
								<view class="flex justify-start align-center">
									<view class="padding-right-xs text-grey">客户名称</view>
									<view class="padding-right-xs text-cut">{{card.customerName}}</view>
									<view class="padding-right-xs" v-if="card.phone">
										<text class="cuIcon-dianhua padding-right-xs padding-left-xs text-orange"></text>{{card.phone}}
									</view>
								</view>
							</view>
							<view>
							</view>
						</view>

						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">机&nbsp;&nbsp;台&nbsp;&nbsp;号</view>
							<view class="padding-right-xl text-red">{{card.deviceNo}}</view>
							<view class="padding-right-xs text-grey">生产日期</view>
							<view>{{card.productDate || ''}}</view>
							<!-- <view class="cu-tag light round bg-blue sm">{{card.productTypeName}}</view> -->
						</view>

						<view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</view>
							<view class="padding-right-xl text-red">{{card.width}}</view>
							<view class="padding-right-xs text-grey">克&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</view>
							<view class="padding-right-xs text-red">{{card.weight}}</view>
						</view>
						<!-- <view class="flex align-center margin-top-xs">
							<view class="padding-right-xs text-grey">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
							<view class="text-cut max-width550">{{card.remark}}</view>
						</view> -->
					</view>
					<view class="flex solid-top padding justify-between align-center">
						<view class="text-cut lighttext-blue">
							<text class="cuIcon-countdown padding-right-xs text-orange"></text>
							{{card.createTime}}
						</view>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			card: Object
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.max-width550 {
		width: 550upx;
	}
	view.flex.content{
		display: flex;
		&>view{
			flex: 1;
			flex-basis: 25%;
		}
	}
	.cu-item {
		.text-grey {
			display: flex;
			flex-basis: 65px;
			white-space: nowrap;			
			justify-content: space-between;
			&+.padding-right-xl,&+.padding-right-xs{
				min-width: 75px;
			}
		}
	}
</style>
