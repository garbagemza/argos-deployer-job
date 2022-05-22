# argos-node-template

This is template for microservices

docker run --rm -p 80:8080 -d -v /your/user/data:/usr/data argos-node


### using curl

* argos-node-template % curl -v http://localhost:8080/your/path
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /your/path HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.79.1
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< ETag: W/"d-gIazy4nMQsxepH2sMeJyz2xzZ1w"
< Date: Sun, 08 May 2022 21:38:37 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
The sum is: 3%                                                                  mauroaz@nabucodonosor argos-node-template % 
