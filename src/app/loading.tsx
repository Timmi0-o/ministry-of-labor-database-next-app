import { Section } from '@/components/ui/Section'

const loading = () => {
	return (
		<Section>
			<div className={`flex flex-col items-center w-full`}>
				{/* TITLE */}
				<h1 className='w-[12vw] h-[2vw] bg-[#F6F4F2] animate-pulse rounded-[0.3vw]'></h1>
				<div className={`grid duration-200 grid-cols-5 gap-[2vw] mt-[1vw]`}>
					{Array.from({ length: 8 }).map((_, i: number) => (
						<div
							className='w-[13vw] h-[20vw] relative flex flex-col items-center gap-[1vw] bg-[#ededed] animate-pulse py-[0.5vw] px-[1vw] rounded-[0.6vw] border-transparent border-[0.1vw] duration-200'
							key={i}
						>
							<div className='flex items-center gap-[0.2vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[4vw] h-[1.2vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[3vw] h-[1.2vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
							</div>
							<div className='flex items-center gap-[0.2vw]'>
								<div className='w-[2vw] h-[1vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[2vw] h-[1vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[3vw] h-[1vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'></div>
							</div>
							<div className='flex flex-col justify-start pt-[1vw] items-center gap-[1vw] w-[10vw] h-[15vw] bg-[#cacaca] animate-pulse rounded-[0.3vw]'>
								<div className='w-[8vw] h-[1vw] bg-[#ebebeb] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[8vw] h-[1vw] bg-[#ebebeb] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[8vw] h-[1vw] bg-[#ebebeb] animate-pulse rounded-[0.3vw]'></div>
								<div className='w-[8vw] h-[1vw] bg-[#ebebeb] animate-pulse rounded-[0.3vw]'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	)
}

export default loading
