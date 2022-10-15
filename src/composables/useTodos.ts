import { computed, ref } from 'vue'
import TodoItem from '../interfaces/todoInterface'
import { useStore } from '../store'

const useTodos = () => {
	const store = useStore()

	const allStatus = ['completed', 'all', 'active']

	const getTodos = async () => {
		await store.dispatch('getTodo')
	}
	const updateTodo = async (todo: TodoItem) => {
		await store.dispatch('updateTodo', todo)
	}
	const deleteTodo = async (id: number) => {
		await store.dispatch('deleteTodo', id)
	}
	const addTodo = async (todo: TodoItem) => {
		await store.dispatch('addTodo', todo)
	}
	const removeCompleted = async (completedTodos: Array<number>) => {
		completedTodos.forEach(async (id) => {
			await store.dispatch('deleteTodo', id)
		})
	}
	const updateAllToComplete = async (todos: TodoItem[]) => {
		todos.forEach(async (todo) => {
			await store.dispatch('updateTodo', todo)
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
