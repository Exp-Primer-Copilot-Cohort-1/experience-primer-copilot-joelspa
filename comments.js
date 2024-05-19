// create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Load the comments from the file
var comments = require('./comments.json');

// Function to handle POST requests
function addComment(req, res) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var comment = qs.parse(body);
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
      if (err) {
        console.error(err);
        res.end('Server error');
      }
      res.end('Success');
    });
  });
}

// Function to handle GET requests
function getComments(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(comments));
}

// Create the server
http.createServer(function(req, res) {
    if (req.method === 'POST') {
        return addComment(req, res);
    }
    if (req.method === 'GET') {
        return getComments(req, res);
    }
}).listen(3000, 'localhost'); // Provide a valid value for the second argument