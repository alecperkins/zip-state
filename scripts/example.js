const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 5000;

http.createServer(function (req, res) {
    console.log(req.method, req.url);
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end();
    } else {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const stream = fs.createReadStream(path.join(__dirname, '..', 'examples', 'browser.html'));
            stream.pipe(res);
        } else if (req.url === '/zip-state.js') {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            const stream = fs.createReadStream(path.join(__dirname, '..', 'zip-state', 'zip-state.js'));
            stream.pipe(res);
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(PORT);
console.log(`Server ready at http://localhost:${ PORT }`);
