'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import Loader from '@/components/ui/Loader'

const GlobalLoader = () => {
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	return isMutating || isFetching ? (
		<div className="fixed top-layout right-layout z-50">
			<Loader />
		</div>
	) : null
}

export default GlobalLoader
