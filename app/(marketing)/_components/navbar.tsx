'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import Logo from './logo'

export default function Navbar() {
	const { isAuthenticated, isLoading } = useConvexAuth()
	const scrolled = useScrollTop()

	return (
		<div
			className={cn(
				'z-50 bg-background fixed top-0 flex items-center w-full p-6',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<Logo />
			<div className='flex items-center justify-between w-full md:ml-auto md:justify-end gap-x-2'>
				{isLoading && <Skeleton className='h-[38px] w-[208px]' />}
				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode='modal'>
							<Button
								variant='ghost'
								size='sm'
								className='font-medium'
							>
								Войти
							</Button>
						</SignInButton>
						<SignInButton mode='modal'>
							<Button size='sm' className='font-medium'>
								Создать Geekzz
							</Button>
						</SignInButton>
					</>
				)}
				{isAuthenticated && !isLoading && (
					<>
						<Button
							variant='ghost'
							size='sm'
							className='font-medium'
							asChild
						>
							<Link href='/documents'>Войти в Geekzz</Link>
						</Button>
						<UserButton afterSignOutUrl='/' />
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	)
}
