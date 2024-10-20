'use client'

import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useTheme } from 'next-themes'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface IconPickerProps {
	onChange: (icon: string) => void
	children: React.ReactNode
	asChild?: boolean
}

export function IconPicker({ onChange, children, asChild }: IconPickerProps) {
	const { theme: currentTheme } = useTheme()

	const themeMap: Record<'dark' | 'light', Theme> = {
		dark: Theme.DARK,
		light: Theme.LIGHT,
	}

	const theme: Theme = themeMap[currentTheme as 'dark' | 'light']

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className='w-full p-0 border-none shadow-none'>
				<EmojiPicker
					height={400}
					theme={theme}
					onEmojiClick={data => onChange(data.emoji)}
				/>
			</PopoverContent>
		</Popover>
	)
}
