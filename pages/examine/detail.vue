<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>

		<view class="bg-white padding-bottom-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-green'" v-for="(item,index) in numList" :key="index">
					<text class="num" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">订单编号:</view>
				<input placeholder="请输入订单编号" name="input" value="wx20171210160722"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">下单人员:</view>
				<input placeholder="请输入下单人员" name="input" value="章细花"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">下单时间:</view>
				<picker mode="date" :value="order.createDate" start="2001-01-01" end="2030-12-31" @change="DateChange">
					<view class="picker">
						{{order.createDate}}
					</view>
				</picker>
			</view>

			<view class="detail-item" v-for="(goods,key) in order.goodsList" :key="key">
				<view class="cu-form-group margin-top">
					<view class="title">销售类型:</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{key === 0 ? '按重量销售': '按条数销售'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">品种:</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'增白'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">要求:</view>
					<input placeholder="请输入要求" name="input" value=""></input>
				</view>
				<view class="cu-form-group">
					<view class="title">单价:</view>
					<input placeholder="请输入单价" name="input" value=""></input>
					<view class="title">个数:</view>
					<input placeholder="请输入个数" name="input" value=""></input>
				</view>
				<view class="cu-form-group">
					<view class="title">宽度:</view>
					<input placeholder="请输入宽度" name="input" value=""></input>
					<view class="title">克重:</view>
					<input placeholder="请输入克重" name="input" value=""></input>
				</view>
				<view class="cu-form-group">
					<view class="title">条数:</view>
					<input placeholder="请输入条数" name="input" value=""></input>
					<view class="title">长度:</view>
					<input placeholder="请输入长度" name="input" value=""></input>
				</view>
			</view>



			<view class="cu-form-group margin-top">
				<view class="title">发货方式:</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'德邦物流'}}
					</view>
				</picker>
			</view>
			<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<!-- #endif -->
			<view class="cu-form-group">
				<!-- <view class="title">详细地址:</view> -->
				<input placeholder="请输入详细地址" name="input" value=""></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="请输入联系电话" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入备注"></textarea>
			</view>
		</form>



		<view class="bg-white padding margin-top">
			<view class="cu-timeline">
				<view class="cu-time">06-17</view>
				<view class="cu-item text-blue">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">审核通过</view>
							<view class="cu-tag line-cyan">10:00</view>
						</view>
						<view class="margin-top">订单审核通过，下一步 等待审核。</view>
					</view>
				</view>

				<view class="cu-item">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-grey">创建</view>
							<view class="cu-tag line-grey">09:30</view>
						</view>
						<view class="margin-top">订单 【wx20171210160722】 由 章细花 创建成功！</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 1,
				numList: [{
					name: '创建'
				}, {
					name: '审核中'
				}, {
					name: '出库'
				}, {
					name: '结束'
				}, ],
				order: {
					createDate: '2018-12-25',
					goodsList: [{},
						{}
					]
				},
				region: ['浙江省', '温州市', '鹿城区'],
			}
		},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value
			},
		}
	}
</script>

<style>

</style>
