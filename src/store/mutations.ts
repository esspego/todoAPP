import { State } from './index'
import TodoItem from '../interfaces/todoInterface'
export const setTodos = (state: State, todos: Array<TodoItem>) => {
	state.todos = todos
}
export const updateTodo = (state: State, todo: TodoItem) => {
	const updateTodos: Array<TodoItem> = state.todos.map((item) => {
		return item.id === todo.id ? todo : item
	})
	setTodos(state, updateTodos)
}
export const deleteTodo = (state: State, id: number) => {
	setTodos(
		state,
		state.todos.filter((todo) => todo.id !== id)
	)
}
export const addTodo = (state: State, todo: TodoItem) => {
	let newTodos = [...state.todos]
	newTodos.push(todo)
	setTodos(state, newTodos)
}
export const setActiveFilter = (state: State, filter: string) => {
	state.activeFilter = filter
}
