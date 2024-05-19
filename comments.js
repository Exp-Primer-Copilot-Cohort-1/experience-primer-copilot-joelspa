// create a web server
// create a route for comments
// return a list of comments

var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response) {
    var url_parts = url.parse(request.url, true);
    if (url_parts.pathname === '/comments') {
        fs.readFile('comments.json', function(err, data) {
            if (err) {
                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ error: "Unable to read comments file" }));
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(data);
            }
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page not found');
    }
}).listen(3000, function() {
    console.log('Server listening on port 3000');
});
