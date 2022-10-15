import { Commit } from 'vuex'
import TodoItem from '../interfaces/todoInterface'
const API_URL = import.meta.env.VITE_API_URL

export const getTodo = async ({ commit }: { commit: Commit }) => {
	let response = await fetch(`${API_URL}/todos`)
	if (response.status === 200) {
		response = await response.json()
		commit('setTodos', response)
	}
	return response
}
export const addTodo = async (
	{ commit }: { commit: Commit },
	todo: TodoItem
) => {
	let response = await fetch(`${API_URL}/todos`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(todo),
	})
	if (response.status === 201) {
		response = await response.json()
		commit('addTodo', response)
	}
	return response
}
export const updateTodo = async (
	{ commit }: { commit: Commit },
	todo: TodoItem
) => {
	let response = await fetch(`${API_URL}/todos/${todo.id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
		body: JSON.stringify(todo),
	})
	if (response.status === 200) {
		response = await response.json()
		commit('updateTodo', response)
	}
	return response
}
export const deleteTodo = async (
	{ commit }: { commit: Commit },
	id: number
) => {
	let response = await fetch(`${API_URL}/todos/${id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'DELETE',
	})
	if (response.status === 200) {
		commit('deleteTodo', id)
	}
	return response
}
