import { unlink } from 'fs/promises'
import cloudinary from '../config/cloudinary'
import { CODE } from './constants'
import { HttpException } from './HttpException'

export const handleCloudinary = async (
	image: Express.Multer.File
): Promise<string> => {
	if (!image) {
		throw new HttpException(CODE.BAD_REQUEST, 'No se ingreso una imagen')
	}

	const res = await cloudinary.uploader.upload(image.path)

	if (!res) {
		throw new HttpException(
			CODE.BAD_REQUEST,
			'No se pudo conectar a Cloudinary'
		)
	}

	const local = `${image.destination}/${image.filename}`
	await unlink(local)

	return res.secure_url
}
