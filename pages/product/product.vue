<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品</block>
		</cu-custom>

		<view class="cu-bar bg-white search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索名称,品种,库存"
				 confirm-type="search"></input>
			</view>
			<view class="action">
				<view class="margin-tb-sm text-center">
					<button class="cu-btn round bg-cyan shadow">搜索</button>
				</view>
			</view>
		</view>
		
		<!-- <scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				<text class="cuIcon-camerafill"></text> 综合
			</view>
			<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				<text class="cuIcon-clothesfill"></text> 销量
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				<text class="cuIcon-upstagefill"></text> 库存
			</view>
		</scroll-view> -->
		
		<goods v-for="(goods,index) in goodsList" :key="index"></goods>
	</view>
</template>

<script>
	import Goods from './goods'
	export default {
		components: {
			Goods
		},
		data() {
			return {
				goodsList: [{}, {}, {}, {}, {}]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
