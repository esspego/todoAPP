<template>
	<div class="">
		<input type="checkbox" class="toggle-all" />
		<label class=""> </label>
		<input
			type="text"
			name="text"
			v-model="todo"
			class="new-todo"
			placeholder="add new todo"
			@keypress.enter.prevent="addNewTodo()"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity'
import useTodos from '../composables/useTodos'
import TodoItem from '../interfaces/todoInterface'
const { todos, addTodo } = useTodos()

const todo = ref('')

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
</script>
<style scoped lang="scss">
.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.new-todo,
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
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
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
	position: absolute;
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
