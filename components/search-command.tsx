'use client'

import { api } from '@/convex/_generated/api'
import { useSearch } from '@/hooks/use-search'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { FileIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command'

export const SearchCommand = () => {
	const { user } = useUser()
	const router = useRouter()
	const documents = useQuery(api.documents.getSearch)

	const [isMounted, setIsMounted] = useState(false)

	const toggle = useSearch(state => state.toggle)
	const isOpen = useSearch(state => state.isOpen)
	const onClose = useSearch(state => state.onClose)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				toggle()
			}
		}

		document.addEventListener('keydown', down)

		return () => {
			document.removeEventListener('keydown', down)
		}
	}, [toggle])

	const onSelect = (id: string) => {
		router.push(`/documents/${id}`)
		onClose()
	}

	if (!isMounted) {
		return null
	}

	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder={`Поиск по ${user?.firstName} Geekzz`} />
			<CommandList>
				<CommandEmpty>Ничего не найдено</CommandEmpty>
				<CommandGroup heading='Документы'>
					{documents?.map(document => (
						<CommandItem
							key={document._id}
							value={`${document._id}-${document.title}`}
							title={document.title}
							onSelect={onSelect}
						>
							{document.icon ? (
								<p className='mr-2 text-lg'>{document.icon}</p>
							) : (
								<FileIcon className='w-4 h-4 mr-2' />
							)}
							<span>{document.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}
