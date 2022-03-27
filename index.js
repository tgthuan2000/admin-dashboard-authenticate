import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import router from './routes/auth.js'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(express.json())

app.use(passport.initialize())

app.use(passport.session())

app.use(
	cors({
		origin: [process.env.DEV_HOST, process.env.PRO_HOST],
		methods: 'GET,POST,PUT',
		credentials: true,
	})
)

app.use('/auth', router)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
	console.log('Server start on port:', PORT)
})
