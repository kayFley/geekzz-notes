'use client'

import { useMutation, useQuery } from 'convex/react'
import { Loader, SearchIcon, TrashIcon, UndoIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

export default function TrashBox() {
	const router = useRouter()
	const params = useParams()
	const documents = useQuery(api.documents.getTrash)
	const restore = useMutation(api.documents.restore)
	const remove = useMutation(api.documents.remove)

	const [search, setSearch] = useState('')

	const filteredDocuments = documents?.filter(document =>
		document.title.toLowerCase().includes(search.toLowerCase())
	)

	const onClick = (documentId: string) => {
		router.push(`/documents/${documentId}`)
	}

	const onRestore = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		documentId: Id<'documents'>
	) => {
		event.stopPropagation()
		const promise = restore({ id: documentId })

		toast.promise(promise, {
			loading: 'Восстановление...',
			success: 'Документ восстановлен',
			error: 'Не удалось восстановить документ',
		})
	}

	const onRemove = (documentId: Id<'documents'>) => {
		const promise = remove({ id: documentId })

		toast.promise(promise, {
			loading: 'Удаление...',
			success: 'Документ удален',
			error: 'Не удалось удалить документ',
		})

		if (params.id === documentId) {
			router.push('/documents')
		}
	}

	if (documents === undefined) {
		return (
			<div className='flex items-center justify-center h-full p-4'>
				<Loader className='w-4 h-4 animate-spin' />
			</div>
		)
	}

	return (
		<div className='text-sm'>
			<div className='flex items-center p-2 gap-x-1'>
				<SearchIcon className='w-4 h-4 text-muted-foreground' />
				<Input
					value={search}
					onChange={event => setSearch(event.target.value)}
					className='px-2 h-7 focus-visible:ring-transparent bg-black/5 dark:bg-white/5'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='px-1 pb-1 mt-2'>
				<p className='hidden pb-2 text-sm text-center last:block text-muted-foreground'>
					Документы не найдены
				</p>
				{filteredDocuments?.map(document => (
					<div
						key={document._id}
						role='button'
						onClick={() => onClick(document._id)}
						className='flex items-center justify-between w-full text-sm rounded-sm hover:bg-black/5 dark:hover:bg-white/5'
					>
						<span className='pl-2 truncate'>{document.title}</span>
						<div className='flex items-center'>
							<div
								onClick={event =>
									onRestore(event, document._id)
								}
								role='button'
								className='p-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5'
							>
								<UndoIcon className='w-4 h-4 text-muted-foreground' />
							</div>
							<ConfirmModal
								onConfirm={() => onRemove(document._id)}
							>
								<div
									role='button'
									className='p-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5'
								>
									<TrashIcon className='w-4 h-4 text-muted-foreground' />
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
