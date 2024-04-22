import { prisma } from '../config/prisma'
import { AuthBody, AuthResponse, UserData, UserResponse } from '../types'
import {
	comparePassword,
	generateJWT,
	hashPassword
} from '../utils/authHandler'

export class UserService {
	static getUsers = async (): Promise<UserResponse[]> => {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				first_name: true,
				last_name: true,
				typeUser: true,
				email: true,
				fechaRegistro: true
			}
		})

		if (users.length === 0) throw new Error('No hay usuarios para mostrar')

		return users
	}

	static createUser = async (data: UserData): Promise<AuthResponse> => {
		const userFind = await prisma.user.findUnique({
			where: { email: data.email }
		})

		if (userFind) throw new Error('El usuario ya existe')

		data.password = await hashPassword(data.password)

		const user = await prisma.user.create({
			data,
			select: {
				id: true,
				first_name: true,
				last_name: true,
				typeUser: true,
				email: true,
				fechaRegistro: true
			}
		})

		const token = generateJWT(user)

		return { user, token }
	}

	static login = async (data: AuthBody): Promise<AuthResponse> => {
		const userFind = await prisma.user.findUnique({
			where: { email: data.email }
		})

		if (!userFind) throw new Error('El usuario no existe')

		const isPassword = await comparePassword(data.password, userFind.password)

		if (!isPassword) throw new Error('La contraseña no es correcta')

		const user: UserResponse = {
			id: userFind.id,
			first_name: userFind.first_name,
			last_name: userFind.last_name,
			email: userFind.email,
			typeUser: userFind.typeUser
		}
		const token = generateJWT(user)

		return { user, token }
	}
}
