<template>
	<view>
		<view class="cu-card case no-card solid-bottom">
			<view class="cu-item shadow padding">
				<view class="flex justify-start">
					<view class="photo margin-right">
						<!-- <image src="http://6776615.s21i.faiusr.com/2/ABUIp86dAxACGAAg_IOQxQUo6b7e4QEw7gU47gU!200x200.jpg"></image> -->
					</view>
					<view class="content">
						<view class="text-black text-bold text-grey h90">
							{{title}}
						</view>
						<view class="text-price text-red text-right price">
							{{option.price}}/吨
						</view>
						<view class="flex justify-start">
							<view class="cu-capsule text-cyan radius">
								<view class='cu-tag bg-cyan sm'>
									库存
								</view>
								<view class="cu-tag line-cyan sm">
								{{option.stockNumber}}
								</view>
							</view>
							<view class="cu-capsule text-olive radius">
								<view class='cu-tag bg-olive sm'>
									重量
								</view>
								<view class="cu-tag line-olive sm">
									{{option.netWeight}}
								</view>
							</view>
							<!-- <view class="cu-capsule text-gray radius">
								<view class='cu-tag bg-green sm'>
									<text class='cuIcon-likefill'></text>
								</view>
								<view class="cu-tag line-green sm">
									53575
								</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Goods',
		data() {
			return {

			}
		},
		props:{
			option:{
				type: Object,
				required:true
			}
		},
		computed: {
			title: function () {
				const  item = this.option
				return `产品编号: ${item.productNo} / 产品名称:  ${item.name} / 要求: ${item.requirement} / 宽度: ${item.width} 克重:  ${item.weight}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.photo {
		image {
			width: 200upx;
			height: 200upx;
		}
	}
	.h90 {
		height: 90upx;
	}
	.price{
		padding: 20upx 10upx 30upx;
	}
</style>
