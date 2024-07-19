import Link from 'next/link'

export const Header = () => {
	return (
		<header className='flex items-center justify-center w-[95vw] h-[5vw] mx-auto mt-[2.5vh] rounded-[0.4vw] bg-[#1D2228] shadow-md shadow-[#b8b8b8]'>
			<Link href={'/'}>
				<h1 className='flex gap-[0.3vw] text-[2vw] font-semibold text-[#ffff]'>
					Ministry of Labor Database
					<p className='text-[1vw]'>(Abakan PC park)</p>
				</h1>
			</Link>
		</header>
	)
}
