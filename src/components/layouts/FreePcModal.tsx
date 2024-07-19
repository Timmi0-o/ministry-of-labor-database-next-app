'use client'
import { fetcher } from '@/utils/fetcher'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { BsMotherboardFill } from 'react-icons/bs'
import { GiProcessor } from 'react-icons/gi'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { MdPrecisionManufacturing, MdSdStorage } from 'react-icons/md'
import { PiGraphicsCardBold } from 'react-icons/pi'
import { SiGooglecloudstorage } from 'react-icons/si'
import { TbNumber } from 'react-icons/tb'
import useSWR from 'swr'
import { ModalWindow } from './ModalWindow'

interface FreePcModalProps {
	isFreePc: boolean
	setIsFreePc: Dispatch<SetStateAction<boolean>>
	idUser: string
}

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

export const FreePcModal = ({
	isFreePc,
	setIsFreePc,
	idUser,
}: FreePcModalProps) => {
	const { data, isLoading } = useSWR(
		{ url: 'http://localhost:5000/pc/free' },
		fetcher,
		{
			refreshInterval: 1000,
		}
	)

	const [addingPc, setAddingPc] = useState(false)

	const [itemId, setItemId] = useState<number | null>(null)

	const handleAddPcToUser = async (idPc: string, i: number) => {
		setItemId(i)
		setAddingPc(true)
		try {
			const response = await axios.post('http://localhost:5000/user/add-pc', {
				idUser,
				idPc,
			})

			if (response.status) {
				setTimeout(() => {
					setAddingPc(false)
					setItemId(null)
					setIsFreePc(false)
				}, 300)
			}
		} catch (error: any) {
			setAddingPc(false)
			setItemId(null)
			console.log(error.response.data)
		}
	}

	return (
		<ModalWindow isShow={isFreePc} setIsShow={setIsFreePc}>
			<div className='flex flex-col items-center'>
				<h2 className='text-[1.3vw] mb-[1vw] font-bold text-[#000000c5]'>
					Выберите PC
				</h2>
				{/* LOADING  */}
				<div
					className={`grid duration-200 h-[30vw] grid-cols-2 gap-[2vw] mt-[1vw]  overflow-y-scroll pr-[0.4vw] ${
						isLoading ? '' : 'hidden'
					}`}
				>
					{Array.from({ length: 5 }).map((_, i: number) => (
						<div
							className='w-[13vw] h-[20vw] relative flex flex-col items-center gap-[1vw] bg-[#c6c4c3] animate-pulse py-[0.5vw] px-[1vw] rounded-[0.4vw] border-transparent border-[0.1vw] duration-200'
							key={i}
						>
							<div className='w-[60%] h-[1vw] bg-[#606060] animate-pulse rounded-[0.3vw]'></div>
							<div className='w-[80%] h-[2vw] bg-[#606060] animate-pulse rounded-[0.3vw]'></div>
							<div className='w-[80%] h-[2vw] bg-[#606060] animate-pulse rounded-[0.3vw]'></div>
							<div className='w-[80%] h-[2vw] bg-[#606060] animate-pulse rounded-[0.3vw]'></div>
							<div className='w-[80%] h-[2vw] bg-[#606060] animate-pulse rounded-[0.3vw]'></div>
						</div>
					))}
				</div>
				{/* PCS LIST  */}
				<div
					className={`grid duration-200 h-[30vw] overflow-y-auto rounded-[0.4vw] pr-[0.4vw] ${
						addingPc ? 'select-none' : ''
					} ${isLoading ? 'hidden' : ''} ${
						data?.length <= 1 ? 'grid-cols-1' : 'grid-cols-2'
					} gap-[1vw] ${
						data?.length === 0 ? 'ml-[100%] absolute opacity-0' : ''
					}`}
				>
					{/* PC ITEM  */}
					{data?.map((pc: PC, i: number) => (
						<div
							onClick={() => (!addingPc ? handleAddPcToUser(pc._id, i) : null)}
							className={`relative grid grid-cols-1 gap-[0.3vw] cursor-pointer bg-white text-black py-[0.5vw] px-[1vw] rounded-[0.4vw] border-transparent border-[0.15vw] hover:border-blue-400 duration-200 h-fit`}
							key={i}
						>
							{/* ONCLICK LOAD  */}
							<div
								className={`absolute size-full flex items-center justify-center bg-[#ffffff95] ${
									addingPc && itemId === i ? '' : 'hidden'
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
				{/* PCS EMPTY  */}
				{data?.length < 1 && !isLoading && (
					<p className='flex gap-[0.3vw] text-[1.2vw] mt-[2vw]'>
						Нет свободных
						<HiOutlineComputerDesktop className='size-[1.5vw] animate-bounce' />
						в наличии!
					</p>
				)}
			</div>
		</ModalWindow>
	)
}
