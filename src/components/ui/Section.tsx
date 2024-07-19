import { ReactNode } from 'react'

export const Section = ({ children }: { children: ReactNode }) => {
	return (
		<section className='flex flex-col items-start w-[84%] ml-[2vw] rounded-[0.7vw] overflow-x-hidden mb-[5vw]'>
			{children}
		</section>
	)
}
