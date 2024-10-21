'use client'

import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useMutation } from 'convex/react'
import { ImagePlusIcon, SmilePlusIcon, XIcon } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { IconPicker } from './icon-picker'
import { Button } from './ui/button'

interface ToolbarProps {
	initialData: Doc<'documents'>
	preview?: boolean
}

export function Toolbar({ initialData, preview }: ToolbarProps) {
	const inputRef = useRef<ElementRef<'textarea'>>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(initialData.title)

	const update = useMutation(api.documents.update)
	const removeIcon = useMutation(api.documents.removeIcon)

	const coverImage = useCoverImage()

	const enableInput = () => {
		if (preview) return

		setIsEditing(true)
		setTimeout(() => {
			setValue(initialData.title)
			inputRef.current?.focus()
		}, 0)
	}

	const disableInput = () => {
		setIsEditing(false)
	}

	const onInput = (value: string) => {
		setValue(value)
		update({
			id: initialData._id,
			title: value || 'Untitled',
		})
	}

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			disableInput()
		}
	}

	const onIconSelect = (icon: string) => {
		update({
			id: initialData._id,
			icon,
		})
	}

	const onRemoveIcon = () => {
		removeIcon({ id: initialData._id })
	}

	return (
		<div className='relative pl-14 group'>
			{!!initialData.icon && !preview && (
				<div className='flex items-center pt-6 gap-x-2 group/icon'>
					<IconPicker onChange={onIconSelect}>
						<p className='text-6xl transition cursor-pointer hover:opacity-75'>
							{initialData.icon}
						</p>
					</IconPicker>
					<Button
						onClick={onRemoveIcon}
						className='text-xs transition rounded-full opacity-0 group-hover/icon:opacity-100 text-muted-foreground'
						variant='outline'
						size='icon'
					>
						<XIcon className='w-4 h-4' />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && (
				<p className='pt-6 text-6xl'>{initialData.icon}</p>
			)}
			<div className='flex items-center py-4 opacity-0 group-hover:opacity-100 gap-x-1'>
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={onIconSelect}>
						<Button
							className='text-xs text-muted-foreground '
							variant='outline'
							size='sm'
						>
							<SmilePlusIcon className='w-4 h-4' />
							Добавить иконку
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button
						className='text-xs text-muted-foreground'
						variant='outline'
						size='sm'
						onClick={coverImage.onOpen}
					>
						<ImagePlusIcon className='w-4 h-4 ' />
						Добавить обложку
					</Button>
				)}
			</div>
			{isEditing && !preview ? (
				<TextareaAutosize
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					value={value}
					onChange={e => onInput(e.target.value)}
					className='text-5xl font-bold break-words bg-transparent outline-none resize-none text-neutral-700 dark:text-neutral-300'
				/>
			) : (
				<div
					onClick={enableInput}
					className='pb-3 text-5xl font-bold break-words outline-none text-neutral-700 dark:text-neutral-300'
				>
					{initialData.title}
				</div>
			)}
		</div>
	)
}
