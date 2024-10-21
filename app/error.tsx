'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Error() {
	return (
		<div className='h-full flex flex-col items-center justify-center space-y-4'>
			<Image
				src={'/error.svg'}
				alt='Error'
				width={328}
				height={328}
				className='dark:hidden'
			/>
			<Image
				src={'/error-dark.svg'}
				alt='Error'
				width={328}
				height={328}
				className='hidden dark:block'
			/>
			<h2 className='text-lg font-medium'>Ой! Что-то сломалось...</h2>
			<Button asChild>
				<Link href={'/documents'}>Вернуться назад</Link>
			</Button>
		</div>
	)
}
