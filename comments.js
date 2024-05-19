// create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// create a server
http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    console.log('path: ' + path);
    if (path === '/addComment') {
        var postData = '';
        req.setEncoding('utf8');
        req.addListener('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.addListener('end', function () {
            var params = querystring.parse(postData);
            console.log('params: ' + JSON.stringify(params));
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('You\'ve sent the name: ' + params.name + '.\n');
            res.write('You\'ve sent the comment: ' + params.comment + '.\n');
            res.end();
        });
    } else {
        fs.readFile(__dirname + path, function (err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Page not found');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data, 'utf8');
                res.end();
            }
        });
    }
}).listen(3000, 'localhost');
console.log('Server running at http://localhost:3000/');
