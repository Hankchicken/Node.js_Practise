const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');

// 啟動時讀取資料，沒有就建立空陣列
let users = [];
try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    users = JSON.parse(data);
} catch {
    users = [];
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

// 寫入檔案的函式
function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

const server = http.createServer((req, res) => {
    // 設定 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 預檢請求
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const pathname = url.pathname;

    // GET /users
    if (method === 'GET' && pathname === '/users') {
        res.writeHead(200);
        res.end(JSON.stringify(users));
        return;
    }

    // GET /users/:id
    if (method === 'GET' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        const user = users.find(u => u.id === id);
        if (user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        return;
    }

    // POST /users
    if (method === 'POST' && pathname === '/users') {
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
                newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
                users.push(newUser);
                saveUsers(users);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        return;
    }

    // PUT /users/:id
    if (method === 'PUT' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => {
            try {
                const updatedData = JSON.parse(body);
                const userIndex = users.findIndex(u => u.id === id);
                if (userIndex !== -1) {
                    users[userIndex] = { id, ...updatedData };
                    saveUsers(users);
                    res.writeHead(200);
                    res.end(JSON.stringify(users[userIndex]));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        return;
    }

    // DELETE /users/:id
    if (method === 'DELETE' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1);
            saveUsers(users);
            res.writeHead(200);
            res.end(JSON.stringify(deletedUser[0]));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        return;
    }

    // 404 Not Found
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
