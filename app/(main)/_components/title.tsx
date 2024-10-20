'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRef, useState } from 'react'

interface TitleProps {
	initialData: Doc<'documents'>
}

export function Title({ initialData }: TitleProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const update = useMutation(api.documents.update)

	const [title, setTitle] = useState(initialData.title || 'Без названия')

	const enableInput = () => {
		setTitle(initialData.title)
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.setSelectionRange(
				0,
				inputRef.current?.value.length
			)
		}, 0)
	}

	const [isEditing, setIsEditing] = useState(false)

	const disableInput = () => {
		setIsEditing(false)
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
		update({
			id: initialData._id,
			title: event.target.value || 'Без названия',
		})
	}

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			disableInput()
		}
	}

	return (
		<div className='flex items-center gap-x-1'>
			{!!initialData.icon && <p>{initialData.icon}</p>}
			{isEditing ? (
				<Input
					ref={inputRef}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={title}
					onClick={enableInput}
					onBlur={disableInput}
					className='px-2 h-7 focus-visible:ring-transparent'
				/>
			) : (
				<Button
					onClick={enableInput}
					variant='ghost'
					size='sm'
					className='h-auto p-1 font-normal'
				>
					<span className='truncate'>{initialData.title}</span>
				</Button>
			)}
		</div>
	)
}

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className='w-20 h-5 rounded-md' />
}
