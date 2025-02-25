import { Poppins } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] })

export default function Logo() {
	return (
		<div className='items-center hidden md:flex gap-x-2'>
			<Image
				src='/logo.svg'
				height={40}
				width={40}
				alt='Logo'
				className='dark:hidden'
			/>
			<Image
				src='/logo-dark.svg'
				height={40}
				width={40}
				alt='Logo'
				className='hidden dark:block'
			/>
			<p className={cn('text-lg font-semibold', font.className)}>
				Geekzz
			</p>
		</div>
	)
}
