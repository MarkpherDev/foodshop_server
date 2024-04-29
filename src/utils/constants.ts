export const PORT: number = Number(process.env.PORT) || 3000
export const JWT_SECRET: string = String(process.env.JWT_SECRET) || ''

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || ''
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ''
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || ''

export enum CODE {
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	CREATED = 201,
	OK = 200,
	INTERNAL_SERVER_ERROR = 500,
	UNAUTHORIZED_ACCESS = 401,
	FORBIDDEN = 403,
	ACCEPTED = 202,
	NOT_MODIFIED = 304
}

export enum ROLE {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
