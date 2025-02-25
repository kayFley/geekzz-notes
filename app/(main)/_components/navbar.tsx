'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { MenuIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Banner } from './banner'
import { Menu } from './menu'
import { Title } from './title'

interface NavbarProps {
	isCollapsed: boolean
	onResetWidth: () => void
}

export function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
	const params = useParams()
	const document = useQuery(api.documents.getById, {
		documentId: params.documentId as Id<'documents'>,
	})

	if (document === undefined) {
		return (
			<nav className='flex items-center justify-between w-full px-3 py-2 bg-background'>
				<Title.Skeleton />
				<div className='flex items-center gap-x-2'>
					<Menu.Skeleton />
				</div>
			</nav>
		)
	}

	if (document === null) {
		return null
	}

	return (
		<>
			<nav className='flex items-center w-full px-3 py-2 bg-background gap-x-4'>
				{isCollapsed && (
					<MenuIcon
						role='button'
						onClick={onResetWidth}
						className='w-6 h-6 text-muted-foreground'
					/>
				)}
				<div className='flex items-center justify-between w-full'>
					<Title initialData={document} />
					<div className='flex items-center gap-x-2'>
						<Menu documentId={document._id} />
					</div>
				</div>
			</nav>
			{document.isArchived && <Banner documentId={document._id} />}
		</>
	)
}
