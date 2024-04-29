import { User } from '@prisma/client'
import { AuthBody, LoginResponse, UserBody, UserResponse } from '../types'

export interface UserRepository {
	create(data: UserBody): Promise<UserResponse>
	login(data: AuthBody): Promise<LoginResponse>
	getByEmail(email: User['email']): Promise<User>
}
