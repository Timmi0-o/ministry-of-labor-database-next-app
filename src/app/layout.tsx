import { Header } from '@/components/layouts/Header'
import { SideBar } from '@/components/layouts/SideBar'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Ministry of Labor Database',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<Header />
				<div className='relative flex justify-between mt-[2.5vh] w-[95vw] mx-auto'>
					<SideBar />
					{children}
				</div>
			</body>
		</html>
	)
}
