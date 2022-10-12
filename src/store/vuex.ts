import { Store } from 'vuex'
import TodoItem from '../interfaces/todoInterface'

declare module '@vue/runtime-core' {
	interface State {
		todos: Array<TodoItem>
	}

	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
