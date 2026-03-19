import { Router } from 'express';
import passport from 'passport';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ username: user.username, role: user.role });
        });
    })(req, res, next);
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
});

// GET /api/auth/me — check current session
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ username: req.user.username, role: req.user.role });
    }
    res.status(401).json({ error: 'Not authenticated' });
});

export default router;