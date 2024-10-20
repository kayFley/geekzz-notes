'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface BannerProps {
	documentId: Id<'documents'>
}

export function Banner({ documentId }: BannerProps) {
	const router = useRouter()

	const remove = useMutation(api.documents.remove)
	const restore = useMutation(api.documents.restore)

	const onRemove = () => {
		const promise = remove({ id: documentId })

		toast.promise(promise, {
			loading: 'Удаление документа...',
			success: 'Документ удален',
			error: 'Не удалось удалить документ',
		})

		router.push('/documents')
	}

	const onRestore = () => {
		const promise = restore({ id: documentId })

		toast.promise(promise, {
			loading: 'Восстановление документа...',
			success: 'Документ восстановлен',
			error: 'Не удалось восстановить документ',
		})
	}

	return (
		<div className='flex items-center justify-center w-full p-2 text-sm text-center text-white bg-rose-600 gap-x-2'>
			<p>Это документ находится в корзине</p>
			<Button
				size='sm'
				onClick={onRestore}
				variant='outline'
				className='h-auto p-1 px-2 font-normal bg-transparent border-white hover:bg-black/20 hover:text-white'
			>
				Восстановить документ
			</Button>
			<ConfirmModal onConfirm={onRemove}>
				<Button
					size='sm'
					variant='outline'
					className='h-auto p-1 px-2 font-normal bg-transparent border-white hover:bg-black/20 hover:text-white'
				>
					Удалить навсегда
				</Button>
			</ConfirmModal>
		</div>
	)
}
