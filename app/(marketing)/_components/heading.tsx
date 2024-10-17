'use client'

import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { useConvexAuth } from 'convex/react'
import { ArrowRightIcon, LoaderIcon } from 'lucide-react'
import Link from 'next/link'

export default function Heading() {
	const { isAuthenticated, isLoading } = useConvexAuth()

	return (
		<div className='max-w-3xl space-y-4'>
			<h1 className='text-3xl font-bold sm:text-5xl md:text-6xl'>
				Ваши Идеи, Документы, и Планы. <br />
				Добро пожаловать в <span className='underline'>Geekzz</span>
			</h1>
			<h3 className='text-base font-medium sm:text-lg md:text-2xl'>
				Рабочее пространство, где работа идет лучше и быстрее.
			</h3>
			{isLoading && (
				<Button className='font-medium' disabled>
					Войти в Geekzz
					<LoaderIcon className='w-4 h-4 ml-2 animate-spin' />
				</Button>
			)}

			{isAuthenticated && !isLoading && (
				<>
					<Button className='font-medium' asChild>
						<Link href='/documents'>
							Войти в Geekzz
							<ArrowRightIcon className='w-4 h-4 ml-2 animate-pulse' />
						</Link>
					</Button>
				</>
			)}

			{!isAuthenticated && !isLoading && (
				<SignInButton mode='modal'>
					<Button className='font-medium'>
						Войти в Geekzz
						<ArrowRightIcon className='w-4 h-4 ml-2 animate-pulse' />
					</Button>
				</SignInButton>
			)}
		</div>
	)
}
