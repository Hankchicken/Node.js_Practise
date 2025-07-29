//http 模組
const http = require('http');

// 假資料記憶體資料庫（用陣列儲存用戶資料）
let users = [];

const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const pathname = url.pathname;

    // GET /users - 獲取所有用戶
    if (method === 'GET' && pathname === '/users') {
        res.writeHead(200);
        res.end(JSON.stringify(users, null, 2));
        return;
    }

    // GET /users/:id - 獲取單個用戶
    if (method === 'GET' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        const user = users.find(u => u.id === id);
        if (user) {
            res.writeHead(200);
            res.end(JSON.stringify(user, null, 2));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }, null, 2));
        }
        return;
    }

    // POST /users - 創建新用戶
    if (method === 'POST' && pathname === '/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = users.length + 1; // 簡單生成 ID
            users.push(newUser);
            res.writeHead(201);
            res.end(JSON.stringify(newUser, null, 2));
        });
        return;
    }

    // PUT /users/:id - 更新用戶
    if (method === 'PUT' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
                users[userIndex] = { id, ...updatedData };
                res.writeHead(200);
                res.end(JSON.stringify(users[userIndex], null, 2));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'User not found' }, null, 2));
            }
        });
        return;
    }
    
    // DELETE /users/:id - 刪除用戶
    if (method === 'DELETE' && pathname.startsWith('/users/')) {
        const id = parseInt(pathname.split('/')[2]);
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1);
            res.writeHead(200);
            res.end(JSON.stringify(deletedUser[0], null, 2));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Route not found' }, null, 2));
        }
        return;
    }

    // 處理無效的路由
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
});

// 監聽端口
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
