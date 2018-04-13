var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
//var url = require('url');
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
var request = require('request');

var bodyParser = require('body-parser');
var fs = require("fs")
var winston = require('winston');    				// 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    	// 로그 일별 처리 모듈
var moment = require('moment');    				// 시간 처리 모듈

var serverUrl = "http://210.101.173.146";
//var serverUrl = "http://cyber.mokwon.ac.kr";

//헤더 부분
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.get('/', function(req, res) {
	console.log('__dirname:'+__dirname);
  res.sendFile(__dirname + '/o2o_room_index.html');
});

// js, css 경로 설정을 위해 추가
app.use('/static', express.static(__dirname + '/'));

// 에러가 발생되어도 서버가 죽지 않도록 처리함. 
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    logger.info('Caught exception: ' + err);
});

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
};

var logger = new (winston.Logger)({
	//winston 모듈로 만드는 로거(Logger, 로그를 출력하는 객체를 말할 때 사용하는 용어)는 transports 라는 속성 값으로 여러 개의 설정 정보를 전달 할 수 있다.
    transports: [
        new (winstonDaily)({
        	//이름이 info-file인 설정 정보는 매일 새로운 파일에 로그를 기록하도록 설정
            name: 'info-file',
            filename: './log/server',
            datePattern: '_yyyy-MM-dd.log',
            colorize: false,
            // 50MB를 넘어 가면 자동으로 새로운 파일을 생성되며, 이때 자동으로 분리되어 생성 되는 파일의 개수는 최대 1000개 까지 가능하다.
	        maxsize: 50000000,            
	        maxFiles: 1000,
	        //info 수준의 로그만 기록하도록 설정함.debug: 0 > info : 1 > notice: 2 > warning :3 > error :4 > crit : 5 > alert : 6 > emerg : 7
	        level: 'info',
	        showLevel: true,
	        json: false,
	        timestamp: timeStampFormat
	    }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
	],

    exceptionHandlers: [
        new (winstonDaily)({
            name: 'exception-file',
            filename: './log/exception',
            datePattern: '_yyyy-MM-dd.log',
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'error',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'exception-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
	]
});


// 서버 기동 시 실행
server.listen(8001, function() {
  console.log('Socket IO server listening on port 8001');
  logger.info('재기동됨');
  this.setTimeout(1000 * 60 * 120); // 2 hours
});

