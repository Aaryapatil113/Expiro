import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getDB } from './db.js';

const initPassport = () => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'username', passwordField: 'password' },
            async (username, password, done) => {
                try {
                    const db = getDB();

                    // Manager hardcoded credentials
                    if (username === 'admin' && password === 'admin') {
                        return done(null, { username: 'admin', role: 'manager' });
                    }

                    // Employee — any username/password works, check if not admin
                    if (username !== 'admin' && password.length > 0) {
                        return done(null, { username, role: 'employee' });
                    }

                    return done(null, false, { message: 'Invalid credentials' });
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser((str, done) => {
        done(null, JSON.parse(str));
    });
};

export default initPassport;