import { Category, Product, User } from '@prisma/client'

/** User Schema */
export type UserBody = Pick<User, 'name' | 'lastname' | 'email' | 'password'>

export type UserResponse = Pick<
	User,
	'id' | 'name' | 'lastname' | 'email' | 'type'
>

export type LoginResponse = UserResponse & {
	token: string
}

export type AuthBody = Pick<User, 'email' | 'password'>

export type AuthPayload = Pick<User, 'id' | 'email' | 'type'>

/** Product */
export type ProductBody = Pick<
	Product,
	'name' | 'description' | 'category' | 'price'
> & {
	image: Express.Multer.File
}
export type ProductUpdate = Partial<ProductBody>
