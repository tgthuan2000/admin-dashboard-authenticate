import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { sanity } from './sanity-client.js'
import { LOGIN, RE_LOGIN } from './query.js'

passport.use(
	new LocalStrategy((username, password, done) => {
		sanity.fetch(LOGIN, { username, password }).then((data) => {
			if (data[0]) {
				done(null, data[0])
				return
			}
			done()
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
			sanity.fetch(RE_LOGIN, { _id }).then((data) => {
				done(null, data[0])
			})
		} else done()
	})
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})
