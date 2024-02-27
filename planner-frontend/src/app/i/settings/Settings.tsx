'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './hooks/useInitialData'
import { useUpdateSettings } from './hooks/useUpdateSettings'

const Settings = () => {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { mutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className="w-1/2"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-2 gap-10">
					<div>
						<Field
							id="email"
							label="Email"
							placeholder="Enter email: "
							type="email"
							{...register('email', {
								required: 'Email is required!',
								minLength: 6
							})}
							extra="mb-4"
						/>
						<Field
							id="name"
							label="Name"
							placeholder="Enter name: "
							{...register('name')}
							extra="mb-4"
						/>
						<Field
							id="password"
							label="Password"
							placeholder="Enter password: "
							type="password"
							{...register('password', {
								minLength: 6
							})}
							extra="mb-10"
						/>
					</div>
					<div>
						<Field
							id="workInterval"
							label="Work Interval"
							placeholder="Enter work interval (min.): "
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra="mb-4"
						/>
						<Field
							id="breakInterval"
							label="Break Interval"
							placeholder="Enter break interval (min.): "
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra="mb-4"
						/>
						<Field
							id="intervalsCount"
							label="Intervals count"
							placeholder="Enter intervals count (min.): "
							isNumber
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
							extra="mb-6"
						/>
					</div>
				</div>
				<Button
					type="submit"
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}

export default Settings
