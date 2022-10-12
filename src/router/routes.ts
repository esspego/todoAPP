import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'TodoList',
		component: () =>
			import(/* webpackChunkName: "TodoList" */ '../pages/TodoPage.vue'),
	},
	{
		path: '/:status',
		name: 'TodoListByStatus',
		component: () =>
			import(
				/* webpackChunkName: "TodoListByStatus" */ '../pages/TodoPage.vue'
			),
	},
	{
		path: '/*',
		redirect: { name: 'TodoList' },
	},
]
