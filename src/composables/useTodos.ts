import { computed, ref } from 'vue'
import TodoItem from '../interfaces/todoInterface'
import { useStore } from '../store'

const useTodos = () => {
	const store = useStore()

	const allStatus = ['completed', 'all', 'active']

	const getTodos = async () => {
		const response = await store.dispatch('getTodo')
		return response
	}
	const updateTodo = async (todo: TodoItem) => {
		const response = await store.dispatch('updateTodo', todo)
		return response
	}
	const deleteTodo = async (id: number) => {
		const response = await store.dispatch('deleteTodo', id)
		return response
	}
	const addTodo = async (todo: TodoItem) => {
		const response = await store.dispatch('addTodo', todo)
		return response
	}
	const removeCompleted = async (completedTodos: Array<number>) => {
		completedTodos.forEach(async (id) => {
			const response = await store.dispatch('deleteTodo', id)
		})
	}
	const updateAllToComplete = async (todos: TodoItem[]) => {
		todos.forEach(async (todo) => {
			const response = await store.dispatch('updateTodo', todo)
		})
	}
	const setFilter = async (filter: string) => {
		store.commit('setActiveFilter', filter)
	}

	return {
		todos: computed(() => store.state.todos),
		activeFilter: computed(() => store.state.activeFilter),
		todosFiltered: computed(() => store.getters.todosFiltered),
		allStatus,
		getTodos,
		addTodo,
		updateTodo,
		deleteTodo,
		removeCompleted,
		updateAllToComplete,
		setFilter,
	}
}

export default useTodos
