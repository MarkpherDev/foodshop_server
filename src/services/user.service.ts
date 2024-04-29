import { User } from '@prisma/client'
import { prisma } from '../config/prisma'
import { UserRepository } from '../repository/user.repository'
import {
	UserBody,
	UserResponse,
	AuthBody,
	LoginResponse,
	AuthPayload
} from '../types'
import { CODE } from '../utils/constants'
import { HttpException } from '../utils/HttpException'
import { comparePassword, generateJWT } from '../utils/authHandler'

class UserService implements UserRepository {
	async getByEmail(email: string): Promise<User> {
		const user: User | null = await prisma.user.findUnique({ where: { email } })

		if (!user) {
			throw new HttpException(CODE.NOT_FOUND, 'El usuario no existe')
		}

		return user
	}
	async create(data: UserBody): Promise<UserResponse> {
		const newUser: UserResponse = await prisma.user.create({ data })

		if (!newUser) {
			throw new HttpException(CODE.BAD_REQUEST, 'No se pudo crear el usuario')
		}

		return newUser
	}

	async login(data: AuthBody): Promise<LoginResponse> {
		const user: User = await this.getByEmail(data.email)

		const isPassword = comparePassword(data.password, user.password)

		if (!isPassword) {
			throw new HttpException(
				CODE.UNAUTHORIZED_ACCESS,
				'La contraseña no es correcta'
			)
		}
		const payload: AuthPayload = {
			id: user.id,
			email: user.email,
			type: user.type
		}

		const token = generateJWT(payload)

		const authResponse: LoginResponse = {
			id: user.id,
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			type: user.type,
			token
		}

		return authResponse
	}
}

export default new UserService()
