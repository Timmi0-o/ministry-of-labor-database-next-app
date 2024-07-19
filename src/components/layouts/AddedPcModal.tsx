'use client'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { TiDeleteOutline } from 'react-icons/ti'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ModalWindow } from './ModalWindow'

interface AddedPcModalProps {
	addedPc: boolean
	setAddedPc: Dispatch<SetStateAction<boolean>>
}

interface Rom {
	title: string
	qty: string
}

export const AddedPcModal = ({ addedPc, setAddedPc }: AddedPcModalProps) => {
	// PC DATA
	const [pcId, setPcId] = useState('000000000')
	const [manufacturer, setManufacturer] = useState('')
	const [motherboard, setMotherboard] = useState('')
	const [ram, setRam] = useState('')
	const [roms, setRoms] = useState<Rom[]>([])
	const [newRomTitle, setNewRomTitle] = useState('')
	const [newRomGB, setNewRomGB] = useState('')
	const [cpu, setCpu] = useState('')
	const [gpu, setGpu] = useState('')

	const [error, setError] = useState('')

	// useEffect(() => {
	// 	console.log('roms', roms)
	// })

	// ADDED NEW ROM AT ARRAY
	const handleAddRom = () => {
		if (newRomTitle && newRomGB) {
			setRoms([...roms, { title: newRomTitle, qty: newRomGB }])
			setNewRomTitle('')
			setNewRomGB('')
		}
	}

	// ADDED NEW PC
	const handleAddPc = async () => {
		try {
			if (
				pcId.length < 10 ||
				!manufacturer ||
				!motherboard ||
				!ram ||
				roms.length === 0 ||
				!cpu ||
				!gpu
			) {
				return setError('Не все данные заполнены!')
			} else {
				setError('')
			}

			const response = await axios.post('http://localhost:5000/pc/create', {
				registrationNumber: pcId,
				manufacturer,
				motherboard,
				ram,
				rom: roms,
				cpu,
				gpu,
			})

			if (response) {
				setAddedPc(false)
				setNewRomGB('')
				setPcId('000000000')
				setManufacturer('')
				setMotherboard('')
				setRam('')
				setRoms([])
				setCpu('')
				setGpu('')
			}
		} catch (error: any) {
			setError(error.response.data.message)
			return console.log(error.response.data)
		}
	}

	return (
		<ModalWindow isShow={addedPc} setIsShow={setAddedPc}>
			<div className='w-[15vw] h-[35vw]'>
				{/* TITLE */}
				<h2 className='text-[1.3vw] font-medium text-center'>Новый PC</h2>
				{/* FORM  */}
				<div className='mt-[1vw] h-[30vw] pr-[1vw] overflow-y-auto'>
					<Input state={pcId} setState={setPcId} placeholder='PC Id' />
					<Input
						state={manufacturer}
						setState={setManufacturer}
						placeholder='Производитель'
					/>
					<Input
						state={motherboard}
						setState={setMotherboard}
						placeholder='Материнская плата'
					/>
					<Input state={cpu} setState={setCpu} placeholder='Процессор' />
					<Input state={gpu} setState={setGpu} placeholder='Видеокарта' />
					<Input state={ram} setState={setRam} placeholder='RAM (кол-во)' />
					{/* ВНУТРЕННЯЯ ПАМЯТЬ */}
					{roms.map((rom, i) => (
						<div className='flex gap-[0.3vw] items-center' key={i}>
							<div className='flex gap-[0.2vw]'>
								<Input
									disabled
									state={rom.title}
									setState={() => {}}
									placeholder='ROM'
								/>
								<div className='w-[3vw]'>
									<Input
										disabled
										state={rom.qty}
										setState={() => {}}
										placeholder='GB'
									/>
								</div>
							</div>
							<TiDeleteOutline
								onClick={() => setRoms(roms.filter((el, index) => index !== i))}
								className='size-[1vw] cursor-pointer'
							/>
						</div>
					))}
					{/* ADD NEW ROM  FORM*/}
					<div className='flex items-center gap-[0.2vw]'>
						<div className='flex gap-[0.2vw]'>
							<Input
								state={newRomTitle}
								setState={setNewRomTitle}
								placeholder='ROM (название)'
							/>
							<div className='w-[4vw]'>
								<Input
									state={newRomGB}
									setState={setNewRomGB}
									placeholder='GB'
								/>
							</div>
						</div>
						{/* ADD NEW ROM  BUTTON*/}
						<IoAdd
							className='size-[1.2vw] cursor-pointer'
							onClick={() => handleAddRom()}
						/>
					</div>
					{/* OUTPUT ERRORS */}
					<h2 className='mb-[2vw] text-red-500 font-bold text-[0.8vw]'>
						{error}
					</h2>
				</div>
			</div>
			<Button onClick={() => handleAddPc()} title='Добавить' />
		</ModalWindow>
	)
}
