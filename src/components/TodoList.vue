<template>
	<div class="main">
		<div class="todo-list">
			<li
				v-for="todo in todosFiltered"
				:key="todo.id"
				:class="{
					completed: todo.status === 'completed',
					editing: todoEditing.id === todo.id,
					view: todoEditing.id !== todo.id,
				}"
			>
				<div v-if="todoEditing.id !== todo.id">
					<input
						type="checkbox"
						:checked="todo.status === 'completed'"
						class="toggle"
						@change="changeStatus(todo)"
					/>
					<label @dblclick.stop="editTodo(todo)">
						<span>{{ todo.text }}</span>
					</label>
					<button
						style="width: 50px"
						@click.stop.prevent="deleteTodo(todo.id)"
						class="destroy"
					></button>
				</div>
				<input
					v-else
					type="text"
					class="edit"
					v-model="todoEditing.text"
					@blur="changeText"
					@keypress.enter="changeText"
					@keydown.esc="finishEdit"
				/>
			</li>
		</div>
		<ActionFooter />
	</div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, Ref, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import useTodos from '../composables/useTodos'
import TodoItem from '../interfaces/todoInterface'
import ActionFooter from './ActionFooter.vue'
const route = useRoute()
const { todos, getTodos, updateTodo, deleteTodo } = useTodos()

let todoEditing: Ref<TodoItem> = ref({
	id: NaN,
	text: '',
	status: 'active',
})

const todosFiltered: ComputedRef<TodoItem[]> = computed(() => {
	const activeFilter: string | string[] = route.params.status || 'all'
	if (activeFilter === 'all') return todos.value
	return todos.value.filter((todo) => todo.status === activeFilter)
})

const changeStatus = (todo: TodoItem) => {
	let { status } = todo
	todo.status = status === 'completed' ? 'active' : 'completed'
	updateTodo(todo)
}
const editTodo = (todo: TodoItem) => {
	todoEditing.value = { ...todo }
}
const changeText = async () => {
	if (todoEditing.value.text.length > 0) {
		await updateTodo(todoEditing.value)
	} else {
		await deleteTodo(todoEditing.value.id)
	}
	finishEdit()
}
const finishEdit = () => {
	todoEditing.value = {
		id: NaN,
		text: '',
		status: 'active',
	}
}

getTodos()
</script>
<style lang="scss" scoped>
.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: 471px;
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: '×';
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
	.todo-list li .toggle {
		background: none;
	}

	.todo-list li .toggle {
		height: 40px;
	}
}
</style>
