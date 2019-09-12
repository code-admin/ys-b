<template>
	<view>
		<scroll-view scroll-y class="page">
			<banner></banner>
			<qt-nav></qt-nav>
		</scroll-view>
	</view>
</template>

<script>
	import Banner from '../components/banner.vue';
	import QtNav from '../components/nav.vue'
	export default {
		components: {
			Banner,
			QtNav
		},
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
