import type { Metadata } from 'next'

import { Toaster } from 'sonner'

import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ThemeProvider } from '@/components/theme-provider'

import { inter } from './fonts'
import './globals.css'

export const metadata: Metadata = {
	title: 'Geekzz',
	description: 'Geekzz notes',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ConvexClientProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
						storageKey='geekzz-theme-2'
					>
						<Toaster position='bottom-center' />
						{children}
					</ThemeProvider>
				</ConvexClientProvider>
			</body>
		</html>
	)
}
