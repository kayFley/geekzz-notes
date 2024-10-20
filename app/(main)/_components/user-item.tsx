'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutButton, useUser } from '@clerk/nextjs'
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu'
import { ChevronsUpDownIcon } from 'lucide-react'

export function UserItem() {
	const { user } = useUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					role='button'
					className='flex items-center w-full p-3 text-sm hover:bg-black/5 dark:hover:bg-white/5'
				>
					<div className='flex items-center gap-x-2 max-w-36'>
						<Avatar className='w-5 h-5'>
							<AvatarImage src={user?.imageUrl} />
						</Avatar>
						<span className='font-medium text-start line-clamp-1'>
							{user?.fullName} Geekzz
						</span>
					</div>
					<ChevronsUpDownIcon className='w-4 h-4 ml-2 text-muted-foreground' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col p-2 space-y-4'>
					<p className='text-sm font-medium leading-none text-muted-foreground'>
						{user?.emailAddresses[0].emailAddress
							? `${user?.emailAddresses[0].emailAddress.slice(0, 3)}***${user?.emailAddresses[0].emailAddress
									.split('@')[0]
									.slice(
										-3
									)}@${user?.emailAddresses[0].emailAddress
									.split('@')
									.pop()}`
							: ''}
					</p>
					<div className='flex items-center gap-x-2'>
						<div className='p-1 rounded-md'>
							<Avatar className='w-8 h-8'>
								<AvatarImage src={user?.imageUrl} />
							</Avatar>
						</div>
						<div className='space-y-1'>
							<p className='text-sm line-clamp-1'>
								{user?.fullName} Geekzz
							</p>
						</div>
					</div>
					<ModeToggle />
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					asChild
					className='w-full transition duration-300 ease-in-out rounded-sm cursor-pointer text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:outline-none'
				>
					<SignOutButton>Выход</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
