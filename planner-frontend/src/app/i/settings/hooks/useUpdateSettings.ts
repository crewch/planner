import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export const useUpdateSettings = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Successfully update profile!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	return { mutate, isPending }
}
