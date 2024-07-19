import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ModalWindow } from './ModalWindow'

interface AddedWorkerModalProps {
	addWorker: boolean
	setAddWorker: Dispatch<SetStateAction<boolean>>
}

export const AddedWorkerModal = ({
	addWorker,
	setAddWorker,
}: AddedWorkerModalProps) => {
	// FORM ON USER
	const [userId, setUserId] = useState('00000')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [pc, setPc] = useState('')

	const [errors, setErrors] = useState('')

	const handleNewUser = async () => {
		try {
			if (!userId || !firstName || !lastName) {
				return setErrors('Не все поля заполнены!')
			} else {
				setErrors('')
			}

			const response = await axios.post('http://localhost:5000/user/create', {
				userId,
				firstName,
				lastName,
				patronymic,
			})

			if (response) {
				setAddWorker(false)
			}
		} catch (error: any) {
			console.log(error.response.data)
			setErrors(error.response.data.message)
		}
	}

	return (
		<ModalWindow isShow={addWorker} setIsShow={setAddWorker}>
			<div className='w-[15vw] h-[30vw]'>
				<h2 className='text-[1.3vw] font-medium text-center'>
					Новый сотрудник
				</h2>
				<div className='mt-[1vw]'>
					<Input state={userId} setState={setUserId} placeholder='User Id' />
					<Input state={firstName} setState={setFirstName} placeholder='Имя' />
					<Input
						state={lastName}
						setState={setLastName}
						placeholder='Фамилия'
					/>
					<Input
						state={patronymic}
						setState={setPatronymic}
						placeholder='Отчество (*если есть)'
					/>
				</div>
				<p className='text-red-500 text-[0.8vw] font-bold'>{errors}</p>
			</div>
			<Button onClick={() => handleNewUser()} title='Добавить' />
		</ModalWindow>
	)
}
