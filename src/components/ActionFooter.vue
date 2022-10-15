<template>
	<div class="footer">
		<span class="todo-count">
			<strong>{{ todosActiveQuantity }}</strong>
			Item<span v-if="todosActiveQuantity > 1 || todosActiveQuantity === 0"
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
			<a v-if="hasCompletedTodos" @click.prevent="clearCompleted()">
				Clear completed
			</a>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import useTodos from '../composables/useTodos'
import { computed, ComputedRef } from 'vue'
import TodoItem from '../interfaces/todoInterface'

const { todosFiltered, allStatus, activeFilter, removeCompleted, setFilter } =
	useTodos()
const route = useRoute()
const router = useRouter()

const todosActiveQuantity: ComputedRef<number> = computed(() => {
	return todosFiltered.value.filter(
		(todo: TodoItem) => todo.status === 'active'
	).length
})
const hasCompletedTodos: ComputedRef<boolean> = computed(() => {
	return todosFiltered.value.find(
		(todo: TodoItem) => todo.status === 'completed'
	)
})

const filterTodos = (status: string) => {
	setFilter(status)
	router.replace({ name: 'TodoListByStatus', params: { status } })
}
const clearCompleted = () => {
	let completedTodo = todosFiltered.value
		.filter((todo: TodoItem) => todo.status === 'completed')
		.map((todo: TodoItem) => todo.id)
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
	&:before {
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
	li {
		display: inline;
		a {
			color: inherit;
			margin: 3px;
			padding: 3px 7px;
			text-decoration: none;
			border: 1px solid transparent;
			border-radius: 3px;
			text-transform: capitalize;
			cursor: pointer;
			&:hover {
				border-color: rgba(175, 47, 47, 0.1);
			}
			&.selected {
				border-color: rgba(175, 47, 47, 0.2);
			}
		}
	}
}
.clear-completed {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
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
