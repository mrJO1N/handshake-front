const jwt = require('jsonwebtoken');

const JWT_SECRET = "hello"

module.exports = (req, res, next) => {

    // POST /register - регистрация нового пользователя
    if (req.method === "POST" && req.path === "/register") {
        const { username, password, email } = req.body;

        // Валидация входных данных
        if (!username || !password || !email) {
            res.status(400).jsonp({ message: 'Missing username, password, or email' });
            return;
        }

        const db = req.app.db;
        const users = db.get('users').value();

        // Проверяем, существует ли пользователь с таким username
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            res.status(409).jsonp({ message: 'User already exists' });
            return;
        }

        // Создаём нового пользователя
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username,
            email,
            password, // В реальном приложении нужно хешировать пароль!
            createdAt: new Date().toISOString()
        };

        // Сохраняем в БД
        db.get('users').push(newUser).write();

        // Создаём JWT токен
        const token = jwt.sign({ sub: newUser.id }, JWT_SECRET);

        // Возвращаем пользователя БЕЗ пароля и токен
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).jsonp({
            user: userWithoutPassword,
            accessToken: token
        });

        return;
    }

    // POST /login - вход пользователя
    if (req.method === "POST" && req.path === "/login") {
        const { email, password } = req.body;

        // Валидация входных данных
        if (!email || !password) {
            res.status(400).jsonp({ message: 'Missing username or password' });
            return;
        }

        const db = req.app.db;
        const users = db.get('users').value();


        // Ищем пользователя по username
        const user = users.find(u => u.email === email);

        if (!user) {
            res.status(401).jsonp({ message: 'Invalid username or password' });
            return;
        }

        // Проверяем пароль
        if (user.password !== password) {
            res.status(401).jsonp({ message: 'Invalid username or password' });
            return;
        }

        // Создаём JWT токен
        const token = jwt.sign({ sub: user.id }, JWT_SECRET);

        // Возвращаем пользователя БЕЗ пароля и токен
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).jsonp({
            user: userWithoutPassword,
            accessToken: token
        });

        return;
    }

    // GET /me - вернуть текущего пользователя по токену
    if (req.method === 'GET' && req.path === '/me') {
        const authHeader = req.get('authorization');

        if (!authHeader) {
            res.status(401).jsonp({ message: 'Missing authorization header' });
            return;
        }

        // Парсим токен из "Bearer <token>"
        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).jsonp({ message: 'Invalid authorization header' });
            return;
        }

        // Получаем юзеров из БД
        const db = req.app.db;
        const users = db.get('users').value();

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded token:", decoded)

            // Ищем юзера по id из токена
            const user = users.find(u => u.id === decoded.sub);

            if (!user) {
                res.status(401).jsonp({ message: 'User not found' });
                return;
            }

            // Возвращаем юзера БЕЗ пароля
            const { password: _, ...userWithoutPassword } = user;
            res.jsonp(userWithoutPassword);
        } catch (error) {
            console.error(error)
            res.status(401).jsonp({ message: 'Invalid token', error: error.message });
        }

        return;
    }

    // GET /posts/by-author/:username - получить посты автора
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
