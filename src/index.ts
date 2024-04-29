import server from './server'
import { PORT } from './utils/constants'
import colors from 'colors'

server.listen(PORT, () => {
	console.log(
		colors.cyan(
			`API Corriendo Correctamente en http://localhost:${PORT}/api/v1`
		)
	)
})
