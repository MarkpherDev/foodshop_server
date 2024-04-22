import express, { Express } from 'express'
import dotenv from 'dotenv'
import ApiRouter from './routes'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.disable('x-powered-by')

app.use('/api/v1', ApiRouter)

export default app
