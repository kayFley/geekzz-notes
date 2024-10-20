'use client'

import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import {
	ChevronsLeftIcon,
	MenuIcon,
	PlusIcon,
	SearchIcon,
	SettingsIcon,
	TrashIcon,
} from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useSearch } from '@/hooks/use-search'
import { useSettings } from '@/hooks/use-settings'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { DocumentList } from './document-list'
import { Item } from './item'
import { Navbar } from './navbar'
import TrashBox from './trash-box'
import { UserItem } from './user-item'

export function Navigation() {
	const params = useParams()
	const settings = useSettings()
	const search = useSearch()
	const pathname = usePathname()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const create = useMutation(api.documents.create)

	const isResizingRef = useRef(false)
	const sidebarRef = useRef<ElementRef<'aside'>>(null)
	const navbarRef = useRef<ElementRef<'div'>>(null)
	const [isResetting, setIsResetting] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(isMobile)

	useEffect(() => {
		if (isMobile) {
			collapse()
		} else {
			resetWidth()
		}
	}, [isMobile])

	useEffect(() => {
		if (isMobile) {
			collapse()
		}
	}, [pathname, isMobile])

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault()
		event.stopPropagation()

		isResizingRef.current = true
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return
		let newWidth = event.clientX

		if (newWidth < 240) newWidth = 240
		if (newWidth > 480) newWidth = 480

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`
			navbarRef.current.style.setProperty('left', `${newWidth}px`)
			navbarRef.current.style.setProperty(
				'width',
				`calc(100% - ${newWidth}px)`
			)
		}
	}

	const handleMouseUp = () => {
		isResizingRef.current = false
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}

	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false)
			setIsResetting(true)

			sidebarRef.current.style.width = isMobile ? '100%' : '240px'
			navbarRef.current.style.setProperty(
				'width',
				isMobile ? '0' : 'calc(100% - 240px)'
			)
			navbarRef.current.style.setProperty(
				'left',
				isMobile ? '100%' : '240px'
			)
			setTimeout(() => setIsResetting(false), 300)
		}
	}

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true)
			setIsResetting(true)

			sidebarRef.current.style.width = '0'
			navbarRef.current.style.setProperty('width', '100%')
			navbarRef.current.style.setProperty('left', '0')
			setTimeout(() => setIsResetting(false), 300)
		}
	}

	const handleCreate = () => {
		const promise = create({ title: 'Новый документ' })

		toast.promise(promise, {
			loading: 'Создание документа...',
			success: 'Документ создан',
			error: 'Не удалось создать документ',
		})
	}

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					'relative z-[9999] flex flex-col h-full overflow-y-auto group/sidebar w-60 bg-black/5 dark:bg-white/5',
					isResetting && 'transition-all ease-in-out duration-300',
					isMobile && 'w-0'
				)}
			>
				<div
					onClick={collapse}
					role='button'
					className={cn(
						'absolute w-5 h-5 transition rounded-sm opacity-0 text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-700 top-3 right-2 group-hover/sidebar:opacity-100',
						isMobile && 'opacity-100'
					)}
				>
					<ChevronsLeftIcon className='w-5 h-5 ' />
				</div>
				<div>
					<UserItem />
					<Item
						label='Поиск'
						icon={SearchIcon}
						isSearch
						onClick={search.onOpen}
					/>
					<Item
						label='Настройки'
						icon={SettingsIcon}
						onClick={settings.onOpen}
					/>
					<Item
						onClick={handleCreate}
						label='Новый документ'
						icon={PlusIcon}
					/>
				</div>
				<div className='mt-4'>
					<DocumentList />
					<Item
						onClick={handleCreate}
						icon={PlusIcon}
						label='Добавить документ'
					/>
					<Popover>
						<PopoverTrigger className='w-full mt-4'>
							<Item label='Корзина' icon={TrashIcon} />
						</PopoverTrigger>
						<PopoverContent
							className='p-0 w-72'
							side={isMobile ? 'bottom' : 'right'}
						>
							<TrashBox />
						</PopoverContent>
					</Popover>
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className='absolute top-0 right-0 w-[2px] h-full transition opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize bg-black/5 dark:bg-white/5'
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					'absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]',
					isResetting && 'transition-all ease-in-out duration-300',
					isMobile && 'left-0 w-full'
				)}
			>
				{!!params.documentId ? (
					<Navbar
						isCollapsed={isCollapsed}
						onResetWidth={resetWidth}
					/>
				) : (
					<nav className='w-full px-3 py-2 bg-transparent'>
						{isCollapsed && (
							<MenuIcon
								onClick={resetWidth}
								className='w-5 h-5 transition rounded-sm cursor-pointer text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700'
							/>
						)}
					</nav>
				)}
			</div>
		</>
	)
}
