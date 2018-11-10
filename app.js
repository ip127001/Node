const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'dummy');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Response from Node.js server</h1></body>')
    res.write('</html>')
    res.end();
})

server.listen(3000, () => console.log('server started on port 3000'))