'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface MenuProps {
	documentId: Id<'documents'>
}

export function Menu({ documentId }: MenuProps) {
	const router = useRouter()
	const { user } = useUser()

	const archive = useMutation(api.documents.archive)

	const onArchive = () => {
		const promise = archive({ id: documentId })

		toast.promise(promise, {
			loading: 'Перемещение в корзину...',
			success: 'Документ перемещен в корзину',
			error: 'Не удалось переместить документ в корзину',
		})

		router.push('/documents')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size='sm' variant='ghost'>
					<MoreHorizontalIcon className='w-4 h-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-60'
				align='end'
				alignOffset={8}
				forceMount
			>
				<DropdownMenuItem onClick={onArchive}>
					<TrashIcon className='w-4 h-4 mr-2' />
					Удалить
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className='p-2 text-xs text-muted-foreground'>
					Последнее редактирование: {user?.fullName}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

Menu.Skeleton = function MenuSkeleton() {
	return <Skeleton className='w-8 h-8' />
}
