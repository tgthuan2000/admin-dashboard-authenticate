import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { sanity } from './sanity-client.js'
import { LOGIN, RE_LOGIN } from './routes/query.js'

passport.use(
	new LocalStrategy((username, password, done) => {
		sanity
			.fetch(LOGIN, { username, password })
			.then((data) => {
				done(null, data[0])
			})
			.catch((error) => {
				done(error)
			})
	})
)

export const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_JWT,
}
passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		const { _id, iat, exp } = jwt_payload

		if (exp - iat > 0) {
			sanity
				.fetch(RE_LOGIN, { _id })
				.then((data) => {
					done(null, data[0])
				})
				.catch((error) => {
					done(error)
				})
		} else done(null, false)
	})
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})
