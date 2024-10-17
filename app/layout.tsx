import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Geekzz notes',
	description: 'Geekzz notes',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/logo.svg',
				href: '/logo.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/logo-dark.svg',
				href: '/logo-dark.svg',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
					storageKey='geekzz-theme-2'
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
