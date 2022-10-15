import { State } from '.'
import TodoItem from '../interfaces/todoInterface'

export const todosFiltered = (state: State): TodoItem[] => {
	if (state.activeFilter === 'all') {
		return state.todos
	} else {
		return state.todos.filter((todo) => todo.status === state.activeFilter)
	}
}
