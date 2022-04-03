import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const router = express.Router()

router.get('/failure', (req, res) => {
	res.status(403).json({ succes: false, message: 'Username or password invalid!' })
})

router.get('/failure-token', (req, res) => {
	res.status(403).json({ succes: false, message: 'Token expired!' })
})

// @route POST /auth/login
// @desc Authenticate with username password
// @access Public
router.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/auth/failure' }),
	({ user }, res) => {
		const tokenAccess = jwt.sign({ _id: user._id }, process.env.SECRET_JWT, {
			expiresIn: 24 * 60 * 60 * 1000,
		})
		res.json({ success: true, tokenAccess, user })
	}
)

// @route GET /auth/re-login
// @desc Authenticate with jwt
// @access Public
router.get(
	'/re-login',
	passport.authenticate('jwt', { session: false, failureMessage: 'auth/failure-token' }),
	({ user }, res) => {
		res.json({ success: true, user })
	}
)

export default router
