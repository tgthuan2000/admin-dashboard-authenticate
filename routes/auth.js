import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import './passport.js'

const failureRedirect = '/auth/login'
const router = express.Router()

// @route POST /auth/login
// @desc Authenticate with username password
// @access Public
router.post('/login', passport.authenticate('local', { failureRedirect }), ({ user }, res) => {
	if (user) {
		const tokenAccess = jwt.sign({ _id: user._id }, process.env.SECRET_JWT, {
			expiresIn: 24 * 60 * 60 * 1000,
		})
		res.json({ success: true, tokenAccess, user })
	}
})

// @route GET /auth/re-login
// @desc Authenticate with jwt
// @access Public
router.get('/re-login', passport.authenticate('jwt', { session: false }), ({ user }, res) => {
	if (user) {
		res.json({ success: true, user })
	}
})

export default router
