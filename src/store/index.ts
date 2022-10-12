import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import TodoItem from '../interfaces/todoInterface'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

export interface State {
	todos: Array<TodoItem>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	actions,
	mutations,
	state,
})
export function useStore() {
	return baseUseStore(key)
}
