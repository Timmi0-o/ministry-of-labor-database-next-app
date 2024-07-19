'use client'
import { fetcher } from '@/utils/fetcher'
import axios from 'axios'
import { useState } from 'react'
import { BsMotherboardFill } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { GiProcessor } from 'react-icons/gi'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { MdPrecisionManufacturing, MdSdStorage } from 'react-icons/md'
import { PiGraphicsCardBold } from 'react-icons/pi'
import { SiGooglecloudstorage } from 'react-icons/si'
import { TbNumber } from 'react-icons/tb'
import useSWR from 'swr'
import { Section } from '../ui/Section'
import { FreePcModal } from './FreePcModal'
import { Notification } from './Notification'

interface User {
	_id: string
	userId: string
	firstName: string
	lastName: string
	patronymic?: string
	pc?: [
		{
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
	]
}

export const ParkPc = () => {
	// ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЕЙ С ПК И БЕЗ
	const { data, isLoading } = useSWR(
		{ url: 'http://localhost:5000/user' },
		fetcher,
		{
			refreshInterval: 600,
		}
	)

	const [isItemHovered, setIsItemHovered] = useState<number | null>(null)

	const [isRomHovered, setIsRomHovered] = useState(false)

	// DELETE USER
	// const [deleteItemMove, setDeleteItemMove] = useState('')
	console.log('isItemHovered', isItemHovered)
	const handleDeleteUser = async (id: string) => {
		try {
			await axios.post('http://localhost:5000/user/delete', {
				id,
			})
		} catch (error: any) {
			console.log(error.response.data)
		}
	}

	// OPEN FREE/CLOSE PC FORM
	const [isFreePc, setIsFreePc] = useState(false)

	// SELECT USER ID
	const [idUserNow, setIdUserNow] = useState<string | null>(null)
	console.log('idUserNow', idUserNow)
	// OPEN SELECT PC ON USER FORM
	const handleAddPcModal = () => {
		setIsFreePc(true)
	}

	// DELETE PC TO USER
	const handleDeletePcToUser = async (idUser: string) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/user/delete-pc',
				{
					idUser,
				}
			)

			if (response) {
				setIsFreePc(false)
			}
		} catch (error: any) {
			console.log(error?.response?.data)
		}
	}

	// DELETE USER STATE NOTIFICATION
	const [deleteUserNotify, setDeleteUserNotify] = useState(false)

	return (
		<Section>
			{/* TITLE  */}
			<h1 className='lg:text-[2vw] font-bold mt-[0.3vw] mb-[2vw] text-center w-full'>
				My Team
			</h1>
			{/* LOADING  */}
			<div
				className={`flex flex-col items-center w-full ${
					isLoading ? '' : 'hidden'
				}`}
			>
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
			{/* LIST PC */}
			<div
				className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1vw] size-full ease-in-out duration-300 ${
					data ? '' : 'mt-[-50%] opacity-0 fixed select-none'
				}`}
			>
				{data?.map((user: User, i: number) => (
					<div
						onMouseEnter={() => setIsItemHovered(i)}
						onMouseLeave={() => setIsRomHovered(false)}
						key={i}
					>
						<div
							className={`flex flex-col items-baseline gap-[1vw] py-[1vw] ${
								user?.pc?.length === null ||
								(user && user.pc && user?.pc?.length < 1)
									? 'justify-between'
									: ''
							} gap-[0.7%] items-center w-fit h-fit rounded-[0.6vw] border-[0.1vw] lg:text-[0.9vw] xl:text-[0.7vw] px-[0.4vw] shadow-sm`}
						>
							{/* USER DATA */}
							<div className='flex flex-col items-center w-full gap-[0.4vw]'>
								<div className='flex items-center gap-[0.5vw] mb-[0.5vw]'>
									<div className='size-[1.3vw]'>
										<FaRegUser className='size-[1.3vw]' />
									</div>
									<p className='lg:text-[0.9vw] xl:text-[0.7vw] px-[0.2vw] py-[0.1vw] h-fit rounded-[0.3vw] bg-[#b7d5e9] font-medium'>
										{user.userId}
									</p>
									{/* ADD PC TO USER  */}
									<div
										onMouseEnter={() => setIdUserNow(user._id)}
										className={`w-fit`}
									>
										<div
											onClick={() => handleAddPcModal()}
											className='flex gap-[0.3vw] justify-center items-center bg-[#efefef] w-fit px-[0.3vw] rounded-[0.3vw] cursor-pointer border-[0.1vw] lg:hover:border-[#00000057] active:scale-[0.99] duration-200'
										>
											<p className='text-[1vw]'>+</p>
											<HiOutlineComputerDesktop className='size-[1vw]' />
										</div>
										{/* Free PC modal  */}
										{user._id === idUserNow && (
											<FreePcModal
												idUser={idUserNow}
												isFreePc={isFreePc}
												setIsFreePc={setIsFreePc}
											/>
										)}
									</div>
								</div>
								<div className='flex gap-[0.3vw]'>
									<p className='lg:text-[0.9vw] xl:text-[0.7vw] px-[0.2vw] py-[0.1vw] rounded-[0.3vw] bg-[#b7e9e6] font-medium'>
										{user.lastName}
									</p>
									<p className='lg:text-[0.9vw] xl:text-[0.7vw] px-[0.2vw] py-[0.1vw] rounded-[0.3vw] bg-[#b7e9e6] font-medium'>
										{user.firstName}
									</p>

									{user.patronymic && (
										<p className='lg:text-[0.9vw] xl:text-[0.7vw] px-[0.2vw] py-[0.1vw] rounded-[0.3vw] bg-[#b7e9e6] font-medium'>
											{user.patronymic}
										</p>
									)}
								</div>
							</div>

							{/* PC / LAPTOP DATA  */}
							<div className='workedCardScrollbar max-h-[25vw] overflow-y-auto pr-[1vw]'>
								{user.pc &&
									user.pc.length >= 1 &&
									user.pc.map((pc, j) => (
										<div
											className={`relative flex flex-col gap-[0.4vw] py-[0.5vw] mt-[0.3vw] ${
												j + 1 > 1 && user.pc?.length && j + 1 < user.pc.length
													? 'border-y-[0.1vw] border-y-blue-500'
													: ''
											}`}
											key={pc.registrationNumber}
										>
											<div className='size-[1.3vw]'>
												<HiOutlineComputerDesktop className='size-[1.3vw]' />
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
							{/* DELETE FULL USER OR PC ON USER  */}
							<div
								className={`flex gap-[0.1vw] w-full duration-200 ease-in-out ${
									isItemHovered === i
										? ''
										: 'opacity-0 select-none translate-y-[0.3vw] translate-x-[-0.1vw]'
								}`}
							>
								{/* DELETE FULL USER  */}
								<div
									onClick={() => setDeleteUserNotify(true)}
									className='flex justify-around gap-[0.3vw] w-[4vw] items-center bg-[#ff4e4e] px-[0.3vw] rounded-[0.3vw] cursor-pointer border-[0.1vw] lg:hover:border-[#00000057] active:scale-[0.99] duration-200'
								>
									<p className='text-[1vw] text-white'>-</p>
									<FaRegUser color='white' className='size-[1vw]' />
								</div>
								{/* DELETE PC ON USER  */}
								<div
									onClick={() => handleDeletePcToUser(user._id)}
									className={`flex gap-[0.3vw] justify-around items-center bg-[#ff4e4e] w-[3vw] px-[0.3vw] rounded-[0.3vw] cursor-pointer border-[0.1vw] lg:hover:border-[#00000057] active:scale-[0.99] duration-200 ${
										user.pc && user.pc.length >= 1 ? '' : 'hidden'
									}`}
								>
									<p className='text-[1vw] text-white'>-</p>
									<HiOutlineComputerDesktop
										color='white'
										className='size-[1vw]'
									/>
								</div>
							</div>
							{/* DELETE USER NOTIFY */}
							<Notification
								confirmFN={() => handleDeleteUser(user._id)}
								backFN={() => setDeleteUserNotify(false)}
								isShow={deleteUserNotify}
								setIsShow={setDeleteUserNotify}
								title='Вы точно хотите удалить сотрудника?'
							/>
						</div>
					</div>
				))}
			</div>

			{/* WORKER EMPTY  */}
			{data?.length === 0 && (
				<div className='w-full flex justify-center'>
					<h2 className='text-[2vw] w-[60%] text-center text-[#373737] font-medium bg-[#f4fcff] rounded-[0.2vw] border-[0.1vw]'>
						Тут пока пусто...
					</h2>
				</div>
			)}
		</Section>
	)
}
