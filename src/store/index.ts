import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import TodoItem from '../interfaces/todoInterface'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

export interface State {
	todos: Array<TodoItem>
	activeFilter: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	actions,
	mutations,
	getters,
	state,
})
export function useStore() {
	return baseUseStore(key)
}
