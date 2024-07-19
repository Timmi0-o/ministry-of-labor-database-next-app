import { Dispatch, SetStateAction } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { IoCloseCircleOutline } from 'react-icons/io5'

interface NotificationProps {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	title: string
	confirmFN: any
	backFN: any
}

export const Notification = ({
	isShow,
	setIsShow,
	title,
	confirmFN,
	backFN,
}: NotificationProps) => {
	return (
		<div
			className={`fixed left-0 top-0 size-full flex justify-center items-center z-10 duration-500 ease-in-out overflow-hidden ${
				isShow
					? 'bg-[#0000000d] h-[100vh]'
					: '-z-10 bg-transparent mt-[-100%] select-none'
			}`}
		>
			<div
				className={`flex justify-center items-center absolute w-fit bottom-[2vw] px-[2vw] py-[0.5vw] bg-[#ffffff] rounded-[0.4vw] border-[0.1vw] border-[#00000061] duration-200 delay-[0.5s] ${
					isShow ? '' : 'opacity-0 mt-[2vw] scale-[0.5]'
				}`}
			>
				<h2 className='text-[1vw] font-medium'>{title}</h2>
				<div className='flex gap-[1vw] items-center ml-[2vw]'>
					<GiConfirmed
						onClick={async () => {
							await confirmFN()
							setIsShow(false)
						}}
						className='size-[1.5vw] cursor-pointer'
						color='green'
					/>
					<IoCloseCircleOutline
						onClick={() => backFN()}
						className='size-[1.5vw] cursor-pointer'
						color='red'
					/>
				</div>
			</div>
		</div>
	)
}
