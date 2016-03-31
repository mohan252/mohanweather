var express = require('express');
var bodyParser = require('body-parser');
var cache = require('memory-cache');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  // response.render('pages/index');
  
  var data = cache.get("data");  
  console.log(data);
  response.render('pages/index', "server data");
  
});


app.post('/photon', function(request, response) {
  var data = JSON.stringify(request.body);
  var d = new Date();
  var dataToBeCached = { "date": d.toLocaleString(), "data": data };
  var cachedData = cache.get("data");
  if(cachedData != null){
    cachedData.push(dataToBeCached);
  }
  else
  {
    var arrayData = [];
    arrayData.push(dataToBeCached);
    cache.put("data",arrayData);
  }
  
  console.log("logging start ***************: " + data);
  console.log("logging end ***************");
  response.writeHeader(200, {"Content-Type": "application/json"});  
  response.write("{poststatus:ok}"); 
  response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


