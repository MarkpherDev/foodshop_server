import { ProductCategory, User } from '@prisma/client'

/** Auth */
export type UserData = Pick<
	User,
	'first_name' | 'last_name' | 'email' | 'password'
>

export type UserResponse = Pick<
	User,
	'id' | 'first_name' | 'last_name' | 'email' | 'typeUser'
>

export type Payload = Pick<
	User,
	'id' | 'first_name' | 'last_name' | 'email' | 'typeUser'
>

export type AuthResponse = {
	user: UserResponse
	token: string
}

export type AuthBody = Pick<User, 'email' | 'password'>

/** Category */

export type CategoryResponse = Pick<
	ProductCategory,
	'id' | 'name' | 'description'
>
