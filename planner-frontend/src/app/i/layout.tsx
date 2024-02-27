import { PropsWithChildren } from 'react'

import DashboardLayout from '@/components/dashboard-layout/DashboardLayout'

const layout = ({ children }: PropsWithChildren) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default layout
