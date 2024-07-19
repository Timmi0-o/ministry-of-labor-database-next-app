import { AiOutlineLoading } from 'react-icons/ai'
import { BsFilterLeft } from 'react-icons/bs'

export const FilterListWorked = () => {
	return (
		<div className='relative w-full h-fit rounded-[0.5vw] shadow-sm border-[0.1vw] border-[#00000024]'>
			{/* SOON */}
			<div
				className={`absolute size-full flex gap-[1vw] items-center justify-center bg-[#ffffffbf]`}
			>
				<p className='text-[1vw] font-bold'>In drafting</p>
				<AiOutlineLoading className='size-[1.5vw] animate-spin' />
			</div>
			{/* TITLE */}
			<h1 className='flex items-center justify-center gap-[0.5vw] font-bold text-[1.5vw] text-[#2a2a2a] text-center mt-[0.4vw] tracking-[0.2vw]'>
				<BsFilterLeft className='size-[1.7vw]' />
				Фильтры
			</h1>
			{/* FILTERS  */}
			<div className='w-[75%] mx-auto flex flex-col items-start gap-[0.5vw] mt-[1vw]'>
				<div className='flex items-center gap-[0.5vw]'>
					<div className='size-[1.2vw] border-[0.1vw] border-black rounded-[0.2vw] cursor-pointer'></div>
					<p className='text-[1.2vw] font-medium'>Только с PC</p>
				</div>
				<div className='flex items-center gap-[0.5vw]'>
					<div className='size-[1.2vw] border-[0.1vw] border-black rounded-[0.2vw] cursor-pointer'></div>
					<p className='text-[1.2vw] font-medium'>Только без PC</p>
				</div>
			</div>
		</div>
	)
}
