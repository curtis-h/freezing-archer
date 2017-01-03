var express = require('express');
var app     = express();
var server  = app.listen(8001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening on http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
  // always send index and let angular do the work
  res.sendFile(__dirname + '/public/index.html');
});
