var http = require('http');
var    fs = require('fs');

fs.readFile('./demo/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(3000);
});
