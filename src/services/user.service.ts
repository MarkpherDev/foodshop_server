import { prisma } from '../config/prisma'
import {
	AuthBody,
	AuthResponse,
	UserData,
	UserId,
	UserResponse
} from '../types'
import {
	comparePassword,
	generateJWT,
	hashPassword
} from '../utils/authHandler'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'

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

		if (users.length === 0) {
			throw new HttpException(CODE.NOT_FOUND, 'No hay usuarios para mostrar')
		}

		return users
	}

	static createUser = async (data: UserData): Promise<AuthResponse> => {
		const userFind = await prisma.user.findUnique({
			where: { email: data.email }
		})

		if (userFind) {
			throw new HttpException(CODE.BAD_REQUEST, 'El usuario ya existe')
		}

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

		if (!userFind) {
			throw new HttpException(CODE.NOT_FOUND, 'El usuario no existe')
		}

		const isPassword = await comparePassword(data.password, userFind.password)

		if (!isPassword) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'La contraseña no es correcta'
			)
		}

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

	static getUserById = async (id: UserId) => {
		const user = await prisma.user.findUnique({
			where: { id }
		})

		if (!user) {
			throw new HttpException(CODE.NOT_FOUND, 'El usuario no existe')
		}

		return user
	}
}
