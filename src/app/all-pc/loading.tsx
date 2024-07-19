import { Section } from '@/components/ui/Section'

const loading = () => {
	return (
		<Section>
			<div className='w-full flex justify-center'>
				<h1 className='w-[10vw] h-[1.5vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></h1>
			</div>
			<div className={`flex flex-col items-center w-full`}>
				<div className={`grid duration-200 grid-cols-4 gap-[2vw] mt-[1vw]`}>
					{Array.from({ length: 5 }).map((_, i: number) => (
						<div
							className='w-[17vw] h-[20vw] relative flex flex-col items-center gap-[1vw] bg-[#e1e1e1] animate-pulse py-[0.5vw] px-[1vw] rounded-[0.4vw] border-transparent border-[0.1vw] duration-200'
							key={i}
						>
							<div className='w-[2vw] h-[2vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
							<div className='flex gap-[1vw]'>
								<div className='w-[1vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div className='w-[10vw] h-[1vw] bg-[#f7f7f7] animate-pulse rounded-[0.4vw]'></div>
								<div></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	)
}

export default loading
