var http = require('http');
var config = require('./config');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var template = require('art-template');

//加载控制器
var indexController = require('./controllers/index');
var musicController = require('./controllers/music');

module.exports = function(req,res){
    req.url = decodeURI(req.url);
    if(req.url === '/'){
        indexController.showIndex(req,res);
    }else if(req.url === '/add'){
        musicController.showAdd(req,res);
    }else if(req.url === '/edit'){
        musicController.showEdit(req,res);
    }else if((req.url.indexOf('/node_modules') === 0) || (req.url.indexOf('/uploads') === 0)){
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                return res.end('404 not found');
            }
            res.writeHead(200,{'Content-Type':mime.lookup(req.url)});
            res.write(data);
            res.end();
        });
    }
};