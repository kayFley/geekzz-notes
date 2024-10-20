'use client'

import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react'

interface ItemProps {
	id?: Id<'documents'>
	documentIcon?: string
	active?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onExpand?: () => void
	label: string
	onClick: () => void
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
	const ChevronIcon = expanded ? ChevronDown : ChevronUp

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
					onClick={() => {}}
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
		</div>
	)
}
