const http = require('http');
const path = require('path');
const fs = require('fs');
const notems = require('./notems.js');
const file = ['/', '/favicon.ico','/xterm-addon-fit.js','/xterm.js','/xterm-addon-fit.js.map','/xterm.js.map','/xterm.css'];
const api = ["/notems"];
const indexPage = "index.html";
const webPath = ".";
var rl = 0;
setInterval(() => {
    rl -= 1
    if (rl < 0) rl = 0
}, 1000);
function isDirectorySync(path) {
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
const server = http.createServer((req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {

        var filePath = req.url.split("?")[0].split("#")[0].endsWith("/") || isDirectorySync(path.join(__dirname, 'website', req.url.split("?")[0].split("#")[0])) ? req.url.split("?")[0].split("#")[0] + "/" + indexPage.split("?")[0].split("#")[0] : req.url.split("?")[0].split("#")[0];
        filePath = decodeURIComponent(filePath);
        const fileFullPath = path.join(__dirname, webPath, filePath);
        if (!(file.includes(req.url.split("#")[0].split("?")[0]) || api.includes(req.url.split("#")[0].split("?")[0]))) {
            res.writeHead(307, { 'Location': '/' });
            res.end();
            return;
        }
        if (api.includes(req.url.split("#")[0].split("?")[0])) {
            rl += 5
            if (rl > 10) {
                res.statusCode = 429;
                res.end();
            }
            if (req.url.split("#")[0].split("?")[0] == "/notems") {
                console.log(`notems["${req.method == "GET" ? "get" : "set"}"]("${req.url.split("?")[1]}", "${data}")`)
                notems[req.method == "GET" ? "get" : "set"](req.url.split("?")[1], data)
                    .then((text) => {
                        res.statusCode = 200;
                        res.end(text);
                    })
                    .catch(() => {
                        res.statusCode = 500;
                        res.end();
                    })
            }
        } else {
            fs.readFile(fileFullPath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end();
                } else {
                    res.setHeader('Content-Type', getContentType(filePath));
                    res.end(data);
                }
            });
        }
    })
});


server.listen(11520, () => {
    console.log('Server is running on port 11520');
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.mp3':
            return 'audio/mpeg';
        case '.mp4':
            return 'video/mp4';
        case '.log':
            return 'text/plain';
        case '.txt':
            return 'text/plain';
        default:
            return 'application/octet-stream';
    }
}



function isPathSafe(filePath) {
    const rootPath = path.resolve(__dirname, 'website');
    const resolvedPath = path.resolve(rootPath, filePath);
    return resolvedPath.startsWith(rootPath);
}
