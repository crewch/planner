import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox/Checkbox'
import TransparentField from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import DatePicker from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from './ListView.module.scss'

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListRow = ({ item, setItems }: IListRow) => {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div>
				<span className="inline-flex items-center gap-2.5 w-full">
					<button aria-describedby="todo-item">
						<GripVertical className={styles.grip} />
					</button>
					<Controller
						name="isCompleted"
						control={control}
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)}
					/>
					<TransparentField {...register('name')} />
				</span>
			</div>
			<div>
				<Controller
					name="createdAt"
					control={control}
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className="capitalize">
				<Controller
					name="priority"
					control={control}
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div>
				<button
					className="opacity-50 transition-opacity hover:opacity-100"
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}

export default ListRow
