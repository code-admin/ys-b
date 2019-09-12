<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">反馈详情</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 反馈信息
			</view>
		</view>

		<form>
			<view class="cu-form-group ">
				<view class="title">问题类型:</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'质量问题'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">具体说明:</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的说明文字"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">客户名称:</view>
				<input placeholder="请输入客户名称" name="input" value="章细花"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话:</view>
				<input placeholder="请输入客户名称" name="input" value="13800138000"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">要求:</view>
				<input placeholder="请输入要求" name="input" value="无"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">机台号:</view>
				<input placeholder="请输入机台号" name="input" value="17"></input>
				<view class="title">生产日期:</view>
				<input placeholder="请输入生产日期" name="input" value="2019-06-18"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">宽度:</view>
				<input placeholder="请输入宽度" name="input" value="60"></input>
				<view class="title">克重:</view>
				<input placeholder="请输入克重" name="input" value="55"></input>
			</view>
		</form>

		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 回馈信息
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">回馈人:</view>
				<input placeholder="请输入回馈人" name="input" value="卓军"></input>
				<view class="title">回馈时间:</view>
				<input placeholder="请输入回馈时间" name="input" value="2019-07-01"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">回馈内容:</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的反馈信息"></textarea>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
