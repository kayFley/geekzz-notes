'use client'

import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function DocumentsPage() {
	const { user } = useUser()
	const create = useMutation(api.documents.create)

	const onCreate = () => {
		const promise = create({
			title: 'Новый документ',
		})
		toast.promise(promise, {
			loading: 'Создание документа...',
			success: 'Документ создан',
			error: 'Не удалось создать документ',
		})
	}

	return (
		<div className='flex flex-col items-center justify-center h-full space-y-4'>
			<Image
				src='rocket.svg'
				alt='Empty'
				width={328}
				height={328}
				className='dark:hidden'
			/>
			<Image
				src='rocket-dark.svg'
				alt='Empty'
				width={328}
				height={328}
				className='hidden dark:block'
			/>
			<h2 className='text-lg font-medium'>
				Добро пожаловать в {user?.firstName} Geekzz
			</h2>
			<Button onClick={onCreate}>
				<PlusIcon className='w-4 h-4' />
				Создать документ
			</Button>
		</div>
	)
}
