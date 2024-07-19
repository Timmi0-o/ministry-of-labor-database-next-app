'use client'
import Link from 'next/link'
import { MouseEvent, ReactNode } from 'react'

interface ButtonProps {
	title?: string
	onClick?: any
	className?: string
	TitleClassName?: string
	heightCustom?: string
	href?: string
	removeSize?: boolean
	children?: ReactNode
	noStyle?: boolean
	titleSize?: string
}

export const Button = ({
	title,
	onClick,
	className,
	TitleClassName,
	heightCustom,
	href = '',
	removeSize,
	children,
	noStyle,
	titleSize,
}: ButtonProps) => {
	const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
		if (!href) {
			e.preventDefault()
		}
	}

	return (
		<Link onClick={(e) => handleClickLink(e)} href={href}>
			<button
				onClick={onClick}
				className={`${
					noStyle
						? ''
						: 'flex justify-center items-center w-full rounded-[0.4vw] border-[0.1vw] border-[#5e606c] active:bg-black active:text-white lg:hover:bg-[#000000] lg:hover:text-white duration-200 ease-out active:scale-[0.99] '
				}${className} ${
					!removeSize ? (heightCustom ? heightCustom : 'h-[1.8vw]') : ''
				}`}
			>
				{title && (
					<p
						className={`text-center font-medium ${
							titleSize ? titleSize : 'text-[0.7vw]'
						} ${TitleClassName}`}
					>
						{title}
					</p>
				)}
				{children}
			</button>
		</Link>
	)
}
