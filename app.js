var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
sys = require('util');

// ESTO FÁCILMENTE PUEDE SER REEMPLAZADO POR UN JSP, AUNQUE EL MANEJO DE ARCHIVOS YA LO REALIZA EL APACHE TOMCAT

var server = http.createServer(function(req,res){

	var uri = url.parse(req.url).pathname,
	filename = path.join(process.cwd(),uri);

	if(uri == "/") filename = path.join(__dirname,"/index.html");

	path.exists(filename,function(exists){

		if(!exists){
			res.writeHead(404,{'Content-Type':'application/octet-stream'});
			res.end("File not found");
		}else{			
			fs.readFile(filename,function(err,file){
				if(err){
					res.writeHead(500,{'Content-Type':'text/plain'});
					res.end(err + "\n");
				}else{
					
					var type;
					var encoding;

					if(filename.match(/(.html)$/i) != null){
						type = 'text/html';
						encoding = "binary";
					}else if(filename.match(/(.js)$/i) != null){
						type = 'text/javascript';
						encoding = "binary";
					}else if(filename.match(/(.css)$/i) != null){
						type = 'text/css';
						encoding = "binary";
					}else if(filename.match(/(.swf)$/i) != null){
						type = "application/x-shockwave-flash";
						encoding = "binary";
					}else if(filename.match(/(.png|.jpeg|.jpg|.bmp)$/i) != null){
						console.log("FILENAME : ",filename);
						type = "image/png";
						encoding = "binary";
					}else if(filename.match(/(.rar|.zip)$/i) != null){
						type = "application/octet-stream";
						encoding = "binary";
					}else{
						type = "application/octet-stream";
						encoding = "binary";						
					}

					res.writeHead(200, {'Content-Type': type });	
					res.end(file);
				}
			});
		}
	});
});

var PORT = process.env.PORT || 3000;

server.listen(PORT);