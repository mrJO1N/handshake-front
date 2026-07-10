const jwt = require("jsonwebtoken")

const JWT_SECRET = "hello";

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

// --- helpers ---

const signAccess = (userId) =>
    jwt.sign({ sub: userId, type: 'access' }, JWT_SECRET, { expiresIn: ACCESS_TTL });

const signRefresh = (userId) =>
    jwt.sign({ sub: userId, type: 'refresh' }, JWT_SECRET, { expiresIn: REFRESH_TTL });

const issueTokens = (userId) => ({
    accessToken: signAccess(userId),
    refreshToken: signRefresh(userId),
});

// Достаёт "Bearer <token>" -> token, либо null
const getBearer = (req) => {
    const authHeader = req.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    return token || null;
};

module.exports = (req, res, next) => {

    // POST /register
    if (req.method === "POST" && req.path === "/register") {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            res.status(400).jsonp({ message: 'Missing username, password, or email' });
            return;
        }

        const db = req.app.db;
        const users = db.get('users').value();

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            res.status(409).jsonp({ message: 'User already exists' });
            return;
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        db.get('users').push(newUser).write();

        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).jsonp({
            user: userWithoutPassword,
            ...issueTokens(newUser.id),
        });

        return;
    }

    // POST /login
    if (req.method === "POST" && req.path === "/login") {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).jsonp({ message: 'Missing username or password' });
            return;
        }

        const db = req.app.db;
        const users = db.get('users').value();

        const user = users.find(u => u.email === email);

        if (!user) {
            res.status(401).jsonp({ message: 'Invalid username or password' });
            return;
        }

        if (user.password !== password) {
            res.status(401).jsonp({ message: 'Invalid username or password' });
            return;
        }

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).jsonp({
            user: userWithoutPassword,
            ...issueTokens(user.id),
        });

        return;
    }

    // POST /refresh - обменять refresh на новую пару токенов
    if (req.method === 'POST' && req.path === '/refresh') {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).jsonp({ message: 'Missing refreshToken' });
            return;
        }

        try {
            const decoded = jwt.verify(refreshToken, JWT_SECRET);

            // Проверяем, что это именно refresh, а не access
            if (decoded.type !== 'refresh') {
                res.status(401).jsonp({ message: 'Invalid token type' });
                return;
            }

            const db = req.app.db;
            const user = db.get('users').find({ id: decoded.sub }).value();

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            // Выдаём новую пару (stateless-ротация: старый refresh не отзывается,
            // но истечёт сам через REFRESH_TTL)
            res.status(200).jsonp(issueTokens(user.id));
        } catch (error) {
            console.error(error);
            res.status(401).jsonp({ message: 'Invalid refresh token', error: error.message });
        }

        return;
    }

    // GET /me
    if (req.method === 'GET' && req.path === '/me') {
        const token = getBearer(req);

        if (!token) {
            res.status(401).jsonp({ message: 'Missing or invalid authorization header' });
            return;
        }

        const db = req.app.db;
        const users = db.get('users').value();

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (decoded.type !== 'access') {
                res.status(401).jsonp({ message: 'Invalid token type' });
                return;
            }

            const user = users.find(u => u.id === decoded.sub);

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            const { password: _, ...userWithoutPassword } = user;
            res.jsonp(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(401).jsonp({ message: 'Invalid token', error: error.message });
        }

        return;
    }

    // PATCH /me
    if (req.method === 'PATCH' && req.path === '/me') {
        const token = getBearer(req);

        if (!token) {
            res.status(401).jsonp({ message: 'Missing or invalid authorization header' });
            return;
        }

        const db = req.app.db;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (decoded.type !== 'access') {
                res.status(401).jsonp({ message: 'Invalid token type' });
                return;
            }

            const users = db.get('users').value();
            const user = users.find(u => u.id === decoded.sub);

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            const { username, email } = req.body;

            if (username && username !== user.username) {
                const existingUser = users.find(u => u.username === username);
                if (existingUser) {
                    res.status(409).jsonp({ message: 'User already exists' });
                    return;
                }
            }

            const updates = {};
            if (username) updates.username = username;
            if (email) updates.email = email;

            db.get('users').find({ id: user.id }).assign(updates).write();

            const updatedUser = db.get('users').find({ id: user.id }).value();
            const { password: _, ...userWithoutPassword } = updatedUser;
            res.jsonp(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(401).jsonp({ message: 'Invalid token', error: error.message });
        }

        return;
    }

    // PATCH /me/password
    if (req.method === 'PATCH' && req.path === '/me/password') {
        const token = getBearer(req);

        if (!token) {
            res.status(401).jsonp({ message: 'Missing or invalid authorization header' });
            return;
        }

        const db = req.app.db;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (decoded.type !== 'access') {
                res.status(401).jsonp({ message: 'Invalid token type' });
                return;
            }

            const user = db.get('users').find({ id: decoded.sub }).value();

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                res.status(400).jsonp({ message: 'Missing currentPassword or newPassword' });
                return;
            }

            if (currentPassword !== user.password) {
                res.status(401).jsonp({ message: 'Invalid current password' });
                return;
            }

            db.get('users').find({ id: user.id }).assign({ password: newPassword }).write();

            const updatedUser = db.get('users').find({ id: user.id }).value();
            const { password: _, ...userWithoutPassword } = updatedUser;
            res.jsonp(userWithoutPassword);
        } catch (error) {
            console.error(error);
            res.status(401).jsonp({ message: 'Invalid token', error: error.message });
        }

        return;
    }

    // DELETE /me
    if (req.method === 'DELETE' && req.path === '/me') {
        const token = getBearer(req);

        if (!token) {
            res.status(401).jsonp({ message: 'Missing or invalid authorization header' });
            return;
        }

        const db = req.app.db;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            if (decoded.type !== 'access') {
                res.status(401).jsonp({ message: 'Invalid token type' });
                return;
            }

            const user = db.get('users').find({ id: decoded.sub }).value();

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            db.get('users').remove({ id: user.id }).write();

            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(401).jsonp({ message: 'Invalid token', error: error.message });
        }

        return;
    }

    // GET /posts/by-author/:username
    if (req.method === 'GET' && req.path.startsWith('/posts/by-author/')) {
        const username = req.path.replace('/posts/by-author/', '');
        const db = req.app.db;
        const posts = db.get('posts')
            .filter(post => post.author === username)
            .value();
        res.jsonp(posts);
        return;
    }

    next();
};