'use client'
import { fetcher } from '@/utils/fetcher'
import axios from 'axios'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsMotherboardFill } from 'react-icons/bs'
import { GiProcessor } from 'react-icons/gi'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { MdPrecisionManufacturing, MdSdStorage } from 'react-icons/md'
import { PiGraphicsCardBold } from 'react-icons/pi'
import { SiGooglecloudstorage } from 'react-icons/si'
import { TbNumber } from 'react-icons/tb'
import useSWR from 'swr'
import { Section } from '../ui/Section'

interface PC {
	_id: string
	type: string
	registrationNumber: string
	manufacturer: string
	motherboard: string
	cpu: string
	gpu: string
	ram: number
	rom: [
		{
			title: string
			qty: number
		}
	]
}

export const AllPc = () => {
	// ALL PC
	const { data } = useSWR({ url: 'http://localhost:5000/pc' }, fetcher, {
		refreshInterval: 1000,
	})

	const [itemId, setItemId] = useState<number | null>(null)
	const [deletingPc, setDeletingPc] = useState(false)

	const handleDeletePc = async (idPc: string, i: number) => {
		setItemId(i)
		setDeletingPc(true)
		try {
			const response = await axios.post('http://localhost:5000/pc/delete', {
				id: idPc,
			})
			if (response.status) {
				setTimeout(() => {
					setItemId(null)
					setDeletingPc(false)
				}, 300)
			}
		} catch (error: any) {
			setDeletingPc(false)
			setItemId(null)
			return console.log(error.response.data)
		}
	}

	return (
		<Section>
			<h1 className='lg:text-[3vw] xl:text-[2vw] font-bold tracking-[0.1vw] mt-[0.3vw] mb-[2vw] text-center w-full'>
				Все PC
			</h1>
			{/* LOADING  */}
			<div
				className={`flex flex-col items-center w-full ${data ? 'hidden' : ''}`}
			>
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
			<div
				className={`grid duration-200 ${
					data?.length <= 1 ? 'grid-cols-3' : 'grid-cols-4'
				} gap-[3vw] ${
					data?.length === 0 ? 'ml-[100%] absolute opacity-0' : ''
				}`}
			>
				{data?.map((pc: PC, i: number) => (
					<div
						className='relative grid grid-cols-1 gap-[0.3vw] bg-white text-black py-[0.5vw] px-[1vw] rounded-[0.4vw] border-[0.1vw] duration-200'
						key={i}
					>
						{/* DELETE PC */}
						<IoClose
							color='black'
							onClick={() => (!deletingPc ? handleDeletePc(pc._id, i) : null)}
							className='absolute top-[0.3vw] right-[0.3vw] size-[1.4vw] text-white cursor-pointer lg:hover:rotate-45 duration-300 ease-in-out'
						/>
						{/* ONCLICK LOAD  */}
						<div
							className={`absolute size-full flex items-center justify-center bg-[#ffffff95] ${
								deletingPc && itemId === i ? '' : 'hidden'
							} bg-[#ffff]`}
						>
							<AiOutlineLoading className='size-[1.5vw] animate-spin' />
						</div>
						<div className='w-full flex justify-center'>
							<HiOutlineComputerDesktop className='size-[1.5vw]' />
						</div>
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b]'>
							<TbNumber className='size-[1vw]' />
							{pc.registrationNumber}
						</p>
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b] '>
							<MdPrecisionManufacturing className='size-[0.8vw]' />
							{pc.manufacturer}
						</p>
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b] '>
							<BsMotherboardFill className='size-[0.8vw]' />
							{pc.motherboard}
						</p>
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b] '>
							<SiGooglecloudstorage className='size-[0.8vw]' />
							{pc.ram} GB
						</p>
						{/* ROM  */}
						<div className='flex items-center gap-[0.5vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b]'>
							<MdSdStorage className='size-[0.8vw]' />
							<div>
								{pc.rom.map((rom, i) => (
									<div
										key={i}
										className={`flex items-center text-[0.8vw] px-[0.2vw]`}
									>
										<div className='flex items-center'>
											<p className='mr-[0.5vw]'>{rom.title}</p>
											<p>{rom.qty} GB</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* CPU & GPU  */}
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw] border-b-[0.1vw] pb-[0.2vw] border-[#4d4d4d6b] '>
							<GiProcessor className='size-[0.9vw]' />
							{pc.cpu}
						</p>
						<p className='flex items-center gap-[0.5vw] text-[0.8vw] px-[0.2vw]'>
							<PiGraphicsCardBold className='size-[0.9vw]' />
							{pc.gpu}
						</p>
					</div>
				))}
			</div>
		</Section>
	)
}
