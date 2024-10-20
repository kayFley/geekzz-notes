'use client'

import { useConvexAuth } from 'convex/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Navigation } from './_components/navigation'

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { isAuthenticated, isLoading } = useConvexAuth()

	if (isLoading) {
		return (
			<div className='flex items-center justify-center w-full h-full cursor-wait'>
				<Image
					src={'/loading.svg'}
					alt='Loading'
					width={328}
					height={328}
					className='dark:hidden animate-pulse'
				/>
				<Image
					src={'/loading-dark.svg'}
					alt='Loading'
					width={328}
					height={328}
					className='hidden dark:block animate-pulse'
				/>
			</div>
		)
	}

	if (!isAuthenticated) {
		return redirect('/')
	}

	return (
		<div className='flex h-full'>
			<Navigation />
			<main className='flex-1 h-full overflow-y-auto'>{children}</main>
		</div>
	)
}
