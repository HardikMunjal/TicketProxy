var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var request = require('request');
var ipsec = require('./routes/ip_securer')




app.use('/', ipsec.CrossOriginHeaders);

   
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ 
 	limit: '10mb' 
    })); 

app.use(cookieParser());


app.use(router);
require('./routes')(router);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');


var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

