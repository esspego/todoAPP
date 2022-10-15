<template>
	<div class="todoapp">
		<h1>todos</h1>
		<TodoInput />
		<TodoList />
	</div>
</template>

<script lang="ts" setup>
import TodoList from '../components/TodoList.vue'
import TodoInput from '../components/TodoInput.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import useTodos from '../composables/useTodos'

const route = useRoute()
const router = useRouter()
const { allStatus, setFilter } = useTodos()

onMounted(() => {
	let statusActive: string = route.params.status.toString() || 'all'
	if (!allStatus.includes(statusActive)) {
		router.replace({ name: 'TodoList', params: { status: 'all' } })
	} else {
		setFilter(statusActive)
	}
})
</script>
<style scoped lang="scss">
.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	h1 {
		position: absolute;
		top: -155px;
		width: 100%;
		font-size: 100px;
		font-weight: 100;
		text-align: center;
		color: rgba(175, 47, 47, 0.15);
		-webkit-text-rendering: optimizeLegibility;
		-moz-text-rendering: optimizeLegibility;
		text-rendering: optimizeLegibility;
	}
}
</style>
