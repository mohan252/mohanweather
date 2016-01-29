var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/test', function(request, response) {
  response.writeHeader(200, {"Content-Type": "application/json"});  
  response.write("{status:ok}"); 
  response.end();
});

app.post('/', function(request, response) {
  console.log(request);
  response.writeHeader(200, {"Content-Type": "application/json"});  
  response.write("{status:ok}"); 
  response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


