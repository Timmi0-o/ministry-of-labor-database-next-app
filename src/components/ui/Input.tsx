import { Dispatch, SetStateAction, useState } from 'react'

interface InputProps {
	state: string
	setState: Dispatch<SetStateAction<string>>
	placeholder?: string
	type?: string
	disabled?: boolean
}

export const Input = ({
	state,
	setState,
	placeholder,
	type,
	disabled,
}: InputProps) => {
	const [isFocus, setIsFocus] = useState('border-[#0000007a]')

	// const [placeholder, setPlaceholder] = useState()
	return (
		<div
			className={`flex items-center w-full h-[2.5vw] text-[0.8vw] my-[0.6vw] bg-[#ffffff] rounded-[0.3vw] ${isFocus} border-[0.1vw] duration-300 ease-in-out font-medium`}
		>
			{/* <p>Text</p> */}
			<input
				onFocus={() => setIsFocus('border-blue-700')}
				onBlur={() => setIsFocus('border-[#0000007a]')}
				className='size-full outline-none bg-transparent ml-[0.1vw]'
				disabled={disabled ? true : false}
				onChange={(e) => setState(e.target.value)}
				type={type ? type : 'text'}
				value={state}
				placeholder={placeholder ? placeholder : ''}
			/>
		</div>
	)
}
