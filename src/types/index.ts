import { Category, Product, User } from '@prisma/client'

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

export type CategoryBody = Pick<Category, 'name' | 'description'>

export type CategoryResponse = Pick<Category, 'id' | 'name' | 'description'>

export type CategoryId = Category['id']

export type CategoryUpdateBody = {
	name?: Category['name']
	description?: Category['description']
}

/** Product */

export type ProductBody = Pick<
	Product,
	'name' | 'description' | 'precio' | 'categoryId'
>

export type ProductResponse = Pick<
	Product,
	'name' | 'description' | 'precio' | 'image' | 'status'
>

export type CreateProductBody = ProductBody & {
	image: Express.Multer.File
}

export type CreateProduct = ProductResponse & {
	category: Category
}
