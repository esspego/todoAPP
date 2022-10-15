<template>
	<div class="new-todo">
		<input type="checkbox" class="toggle-all" :checked="isAllChecked" />
		<label class="" @click="checkAll()"></label>
		<input
			type="text"
			name="text"
			v-model.trim="todo"
			class="edit"
			placeholder="add new todo"
			ref="newTodo"
			@keypress.enter="addNewTodo()"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import useTodos from '../composables/useTodos'
import TodoItem from '../interfaces/todoInterface'
const { todosFiltered, addTodo, updateAllToComplete } = useTodos()

const todo = ref('')
const newTodo = ref()

const addNewTodo = () => {
	if (todo.value.length === 0) return
	let newTodo: TodoItem = {
		id: Date.now(),
		status: 'active',
		text: todo.value,
	}
	addTodo(newTodo)
	todo.value = ''
}
const checkAll = () => {
	let updatedTodos: TodoItem[] = todosFiltered.value
		.filter((todo) => todo.status !== 'completed')
		.map((todo) => {
			todo.status = 'completed'
			return todo
		})
	updateAllToComplete(updatedTodos)
}

const isAllChecked = computed(() => {
	return (
		todosFiltered.value.every((todo) => todo.status === 'completed') &&
		todosFiltered.value.length > 0
	)
})
onMounted(() => {
	newTodo.value.focus()
})
</script>
<style scoped lang="scss">
.new-todo {
	display: flex;
	padding: 16px 16px 16px 0px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
	.edit {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		border: 0;
		color: inherit;
		padding: 6px;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
}
.toggle-all {
	text-align: center;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
}
.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	// position: absolute;
	top: -52px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}
.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
	.toggle-all {
		background: none;
	}
}
</style>
