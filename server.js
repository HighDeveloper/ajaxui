var express = require('express');
var app = express();
var config = require('./config');

app.use(express.static(config.demoAppFolder));

app.listen(3000, function() {
    console.log('Server listening...');
});