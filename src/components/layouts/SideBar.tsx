'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CiSettings } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { AddedPcModal } from './AddedPcModal'
import { AddedWorkerModal } from './AddedWorkerModal'

export const SideBar = () => {
	const [addWorker, setAddWorker] = useState(false)

	const [addPc, setAddPc] = useState(false)

	const sideBarMenus = [
		{
			title: 'Добавить сотрудника',
			img: <FaRegUser className='size-[1.5vw]' />,
			onclick: () => setAddWorker(!addWorker),
		},
		{
			title: 'Добавить PC',
			img: <HiOutlineComputerDesktop className='size-[1.5vw]' />,
			onclick: () => setAddPc(!addPc),
		},
		{
			title: 'Все PC',
			img: <HiOutlineComputerDesktop className='size-[1.5vw]' />,
			href: '/all-pc',
		},
	]

	return (
		<aside className='h-fit rounded-[0.5vw] shadow-md border-[0.1vw] border-[#00000024]'>
			{/* TITLE */}
			<h1 className='flex items-center justify-center gap-[0.5vw] font-bold text-[1.5vw] text-[#2a2a2a] text-center mt-[0.4vw] tracking-[0.2vw]'>
				<CiSettings className='size-[1.7vw]' />
				Настройки
			</h1>
			{/* MENU VARIABLES */}
			<div className='flex flex-col items-center mt-[2vh]'>
				{sideBarMenus.map((menu, i) => (
					<Link
						className='flex justify-center w-full'
						key={i}
						href={menu.href ? menu?.href : '#'}
					>
						<div className='w-[90%]'>
							<div
								onClick={menu?.onclick}
								key={i}
								className='flex items-center mb-[0.7vw] h-[3vw] border-b-[0.1vw] border-b-transparent border-t-[0.1vw] border-t-transparent lg:hover:border-t-black lg:hover:border-b-black  cursor-pointer duration-200 ease-in-out active:opacity-50'
							>
								<div className='flex items-center justify-center size-[2.2vw]'>
									{menu.img}
								</div>
								<p className='text-[0.9vw]'>{menu.title}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
			{/* ADDED WORKER */}
			<AddedWorkerModal addWorker={addWorker} setAddWorker={setAddWorker} />
			{/* ADDED PC  */}
			<AddedPcModal addedPc={addPc} setAddedPc={setAddPc} />
		</aside>
	)
}
