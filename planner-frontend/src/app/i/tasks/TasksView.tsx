'use client'

import Loader from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import SwitcherView from './SwitcherView'
import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'

export type TypeView = 'list' | 'kanban'

const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-list',
		defaultValue: 'list'
	})

	if (isLoading)
		return (
			<div className="flex justify-center">
				<Loader />
			</div>
		)

	return (
		<div>
			<SwitcherView
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}

export default TasksView
