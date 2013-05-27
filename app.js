var http = require('http');
var querystring = require('querystring');
var utils = require('util');
var needle = require('needle');
 
http.createServer(function (req, res) {
  // set up some routes
      console.log("got  " + req.method + " to " + req.url);
  switch(req.url) {
    case '/':
      // show the user a simple form
      console.log("[200] " + req.method + " to " + req.url);
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write('<html><head><title>Hello Noder!</title></head><body>');
      res.write('<h1>Welcome Noder, who are you?</h1>');
      res.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
      res.write('Name: <input type="text" name="posturl" value="http://www.yahoo.com" /><br />');
      res.write('Age: <input type="text" name="postdata" value="99" /><br />');
      res.write('<input type="submit" />');
      res.write('</form></body></html');
      res.end();
      break;
    case '/formhandler':
 
      if (req.method == 'POST') {
        console.log("[200] " + req.method + " to " + req.url);
        var fullBody = '';
        
        req.on('data', function(chunk) {
          // append the current chunk of data to the fullBody variable
          fullBody += chunk.toString();
        });
        
        req.on('end', function() {
        
          // request ended -> do something with the data
          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          
          // parse the received body data
          var decodedBody = querystring.parse(fullBody);
          //jsonify
          var test1 = utils.format("%j",decodedBody);
          var test4 = JSON.parse(test1);
          var remoteBody;
 
          
          console.log(test4+" test4posturl "+test4.posturl);
          needle.get(test4.posturl, function(error, response, body){
            res.write(body);
            res.end();
            console.log("Got test4 status code: " + response.statusCode);
          //  console.log("Got test4 body: " + body);
          });

          // output the decoded data to the HTTP response          
          //res.write('<html><head><title>Post data</title></head><body><pre>');
          //res.write(utils.inspect(decodedBody));
          //res.write('</pre></body></html>');
          console.log("before res.end");

          //res.end();
//          console.log(test4+" test4posturl "+test4.posturl);
//          needle.get(test4.posturl, function(error, response, body){
//            console.log("Got test4 status code: " + response.statusCode);
//            console.log("Got test4 body: " + body);
//          });
        });

//          needle.get('http://www.google.com', function(error, response, body){
//            console.log("Got status code: " + response.statusCode);
//          });

        
      } else {
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
      }
      console.log("calling break"); 
      break;
    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
  };
}).listen(8080); // listen on tcp port 8080 (all interfaces)
