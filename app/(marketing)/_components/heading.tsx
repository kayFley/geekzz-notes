'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

export default function Heading() {
	return (
		<div className='max-w-3xl space-y-4'>
			<h1 className='text-3xl font-bold sm:text-5xl md:text-6xl'>
				Ваши Идеи, Документы, и Планы. <br />
				Добро пожаловать в <span className='underline'>Geekzz</span>
			</h1>
			<h3 className='text-base font-medium sm:text-lg md:text-2xl'>
				Рабочее пространство, где работа идет лучше и быстрее.
			</h3>
			<Button className='font-medium'>
				Войти в Geekzz
				<ArrowRightIcon className='w-4 h-4 ml-2 animate-pulse' />
			</Button>
		</div>
	)
}
