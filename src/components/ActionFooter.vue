<template>
	<div class="footer">
		<span class="todo-count">
			<strong>{{ todosActive.length }}</strong>
			Item<span v-if="todosActive.length > 1 || todosActive.length === 0"
				>s</span
			>
			left
		</span>
		<div class="filters">
			<li v-for="(status, index) in allStatus" :key="index">
				<a
					:class="{ selected: status === activeFilter }"
					@click="filterTodos(status)"
					>{{ status }}</a
				>
			</li>
		</div>
		<div class="clear-completed">
			<button v-if="hasCompletedTodos" @click.prevent="clearCompleted()">
				Clear completed
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import useTodos from '../composables/useTodos'
import { computed, ComputedRef } from 'vue'

const { todos, allStatus, removeCompleted } = useTodos()
const route = useRoute()
const router = useRouter()

const activeFilter: ComputedRef<string | string[]> = computed(
	() => route.params.status || 'all'
)

const todosActive = computed(() => {
	return todos.value.filter((todo) => todo.status === 'active')
})
const hasCompletedTodos = computed(() => {
	return todos.value.find((todo) => todo.status === 'completed')
})

const filterTodos = (status: string) => {
	router.replace({ name: 'TodoListByStatus', params: { status } })
}
const clearCompleted = () => {
	let completedTodo = todos.value
		.filter((todo) => todo.status === 'completed')
		.map((todo) => todo.id)
	removeCompleted(completedTodo)
}
</script>
<style lang="scss" scoped>
.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
		0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
		0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
	strong {
		font-weight: 600;
	}
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
	text-transform: capitalize;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

.info {
	margin: 65px auto 0;
	color: #bfbfbf;
	font-size: 10px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}
</style>