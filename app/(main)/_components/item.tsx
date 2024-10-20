'use client'

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
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import {
	ChevronDown,
	ChevronRight,
	LucideIcon,
	MoreHorizontalIcon,
	PlusIcon,
	TrashIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface ItemProps {
	id?: Id<'documents'>
	documentIcon?: string
	active?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onExpand?: () => void
	label: string
	onClick?: () => void
	icon: LucideIcon
}

export function Item({
	id,
	documentIcon,
	active,
	expanded,
	isSearch,
	level = 0,
	onExpand,
	label,
	onClick,
	icon: Icon,
}: ItemProps) {
	const create = useMutation(api.documents.create)
	const archive = useMutation(api.documents.archive)
	const router = useRouter()

	const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		if (!id) return
		const promise = archive({ id })

		toast.promise(promise, {
			loading: 'Перемещение в корзину...',
			success: 'Документ перемещен в корзину',
			error: 'Не удалось переместить документ в корзину',
		})
	}

	const { user } = useUser()

	const handleExpand = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation()
		onExpand?.()
	}

	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		if (!id) return

		const promise = create({
			title: 'Новый документ',
			parentDocument: id,
		}).then(documentId => {
			if (!expanded) {
				onExpand?.()
			}

			router.push(`/documents/${documentId}`)
		})

		toast.promise(promise, {
			loading: 'Создание документа...',
			success: 'Документ создан',
			error: 'Не удалось создать документ',
		})
	}

	const ChevronIcon = expanded ? ChevronDown : ChevronRight

	return (
		<div
			onClick={onClick}
			role='button'
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
			className={cn(
				'flex items-center w-full py-1 pr-3 text-sm font-medium group min-h-7 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground',
				active && 'bg-black/5 dark:bg-white/5'
			)}
		>
			{!!id && (
				<div
					role='button'
					className='h-full mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
					onClick={handleExpand}
				>
					<ChevronIcon className='w-4 h-4 shrink-0 text-muted-foreground/50' />
				</div>
			)}
			{documentIcon ? (
				<div className='mr-2 text-lg shrink-0'>{documentIcon}</div>
			) : (
				<Icon className='w-4 h-4 mr-2 shrink-0 text-muted-foreground' />
			)}

			<span className='truncate'>{label}</span>
			{isSearch && (
				<kbd className='inline-flex items-center h-5 gap-1 px-1 ml-auto font-mono text-sm font-medium border rounded opacity-100 pointer-events-auto select-none bg-muted text-muted-foreground'>
					<span className='text-xs font-medium'>⌘</span>K
				</kbd>
			)}
			{!!id && (
				<div className='flex items-center ml-auto gap-x-2'>
					<DropdownMenu>
						<DropdownMenuTrigger onClick={e => e.stopPropagation()}>
							<div
								role='button'
								className='h-full ml-auto rounded-sm opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600'
							>
								<MoreHorizontalIcon className='w-4 h-4 text-muted-foreground' />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-60'
							align='start'
							side='right'
							forceMount
						>
							<DropdownMenuItem onClick={onArchive}>
								<TrashIcon className='w-4 h-4' />
								Удалить
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<div className='p-2 text-xs text-muted-foreground'>
								Последнее изменение: {user?.fullName}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<div
						role='button'
						onClick={onCreate}
						className='h-full ml-auto rounded-sm opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600'
					>
						<PlusIcon className='w-4 h-4 text-muted-foreground' />
					</div>
				</div>
			)}
		</div>
	)
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			className='flex py-1 gap-x-2'
			style={{ paddingLeft: level ? `${level * 12 + 24}px` : '12px' }}
		>
			<Skeleton className='w-4 h-4' />
			<Skeleton className='w-[30%] h-4' />
		</div>
	)
}
