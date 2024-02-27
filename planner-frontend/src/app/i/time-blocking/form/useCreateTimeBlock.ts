import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTimeBlockFormState } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

export const useCreateTimeBlock = () => {
	const queryClient = useQueryClient()

	const { mutate: createTimeBlock, isPending } = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: (data: TypeTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			})
		}
	})

	return { createTimeBlock, isPending }
}
