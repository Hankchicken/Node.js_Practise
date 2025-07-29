const http = require('http');

const server = http.createServer((req, res) => {
    // 加上正確的 Content-Type 標頭，告訴瀏覽器用 UTF-8 解碼
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('水喔！成功創建第一個 Node.js 網頁伺服器 🎉');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
