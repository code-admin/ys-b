<template>
	<view class="cu-card case">
		<view class="cu-item shadow">
			<view class="flex solid-bottom padding justify-between align-center">
				<view class="text-black text-bold text-grey">{{product.productName + '/' + product.productNo }}</view>
				<view v-if="showDel" class="cu-tag light round bg-red sm" @tap="remove" >删除</view>
			</view>
			
			<view class="padding">
				<view class="flex align-center">
					<view class="padding-right-xs text-grey">要求:</view>
					<view class="padding-right-xl">{{product.requirement}}</view>
				</view>
				<view v-if="orderType === 2" class="flex align-center margin-top-xs">
					<view class="text-grey">宽度:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.width}}</view>
					<view class="text-grey">克重:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.weight}}</view>
					<view class="text-grey">米数:</view>
					<view class="margin-right  padding-left-xs text-red"> {{product.length}}</view>
					<view class="text-grey">个数:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.goodsNumber}}</view>
				</view>
				<view v-else class="flex align-center margin-top-xs">
					<view class="text-grey">宽度:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.width}}</view>
					<view class="text-grey">克重:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.weight}}</view>
					<view class="text-grey">长度:</view>
					<view class="margin-right  padding-left-xs text-red"> {{product.goodsLength}}</view>
					<view class="text-grey">条数:</view>
					<view class="margin-right padding-left-xs text-red"> {{product.goodsNumber}}</view>
				</view>
				<view class="flex align-center margin-top-xs">
					<view class="text-grey">单价:</view>
					<view class="margin-right padding-left-xs text-red text-price"> {{product.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'ProductItem',
		data() {
			return {
				
			};
		},
		props:{
			orderType: Number,
			product:Object,
			showDel:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			remove(){
				this.$emit('remove')
			}
		}
	}
</script>

<style lang="scss">

</style>
