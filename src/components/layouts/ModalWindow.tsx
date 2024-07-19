import { Dispatch, ReactNode, SetStateAction } from 'react'
import { IoClose } from 'react-icons/io5'

interface ModalWindow {
	children: ReactNode
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const ModalWindow = ({ children, isShow, setIsShow }: ModalWindow) => {
	return (
		<div
			className={`fixed left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center z-10 duration-500 ease-in-out ${
				isShow ? 'bg-[#000000c2]' : '-z-10 bg-transparent mt-[-100%]'
			}`}
		>
			<div
				className={`relative px-[2vw] py-[1vw] bg-[#ececec] rounded-[0.6vw] border-[0.1vw] border-[#00000061] duration-200 delay-[0.5s] ${
					isShow ? '' : 'opacity-0 mt-[2vw] scale-[0.5]'
				}`}
			>
				<IoClose
					className='absolute translate-y-[-50%] top-[50%] right-[-3vw] size-[2.5vw] text-white cursor-pointer lg:hover:rotate-45 duration-300 ease-in-out'
					onClick={() => setIsShow(false)}
				/>
				{children}
			</div>
		</div>
	)
}
