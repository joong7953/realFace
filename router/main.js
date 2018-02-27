var url = require('url');
var request = require('request');
var qs = require('querystring');

var serverUrl = "http://210.101.173.146";
//var serverUrl = "http://cyber.mokwon.ac.kr";
var rootPath = "C:/node_workspace/MOKWON_O2O/";
//var rootPath = "C:/node_o2o/";
//헤더 부분
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

module.exports = function(app, fs)
{
	app.get('/',function(req,res){
		console.log('req.url:'+req.url);
    	var uri = req.url;
    	
		var query = url.parse(uri,true).query;
		
		var userId = query.userId;
		var etestInfoId = query.etestInfoId;
		var userType = query.userType;
		var questionNo = query.questionNo;
		var realStatus = query.realStatus;
		console.log('userId:'+query.userId);
		console.log('etestInfoId:'+query.etestInfoId);
		console.log('questionNo:'+query.questionNo);
		
		console.log('__dirname:'+__dirname);
		
		if(userId == undefined || etestInfoId == undefined || questionNo == undefined){
			res.sendFile(rootPath + 'error.html');
		}else{
			var options = {
				    url: serverUrl+'/O2oEtest.do?cmd=profJsonData',
				    method:'POST',
				    headers: headers,
				    form: {'userId': userId, 'etestInfoId': etestInfoId, 'userType':userType, 'questionNo':questionNo, 'realStatus':realStatus}
				}
			
			request(options, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        console.log(body) // Print the google web page.
			        //JSON 파싱 
			        var jsonContent = JSON.parse(body);
					// Get Value from JSON
					
			        var fileFullPath1 = jsonContent.fileFullPath1;
			        var fileFullPath2 = jsonContent.fileFullPath2;
			        var fileFullPath3 = jsonContent.fileFullPath3;
			        
			        if(fileFullPath1 == undefined){
			        	fileFullPath1 = "";
			        }else{
			        	fileFullPath1 = serverUrl+'/lmsdata/'+jsonContent.fileFullPath1;
			        }
			        
			        if(fileFullPath2 == undefined){
			        	fileFullPath2 = "";
			        }else{
			        	fileFullPath2 = serverUrl+'/lmsdata/'+jsonContent.fileFullPath2;
			        }
			        
			        if(fileFullPath3 == undefined){
			        	fileFullPath3 = "";
			        }else{
			        	fileFullPath3 = serverUrl+'/lmsdata/'+jsonContent.fileFullPath3;
			        }
	
			        res.render('index', {
			        	 userType: userType,
			        	 userId: userId,
			        	 etestInfoId: jsonContent.etestInfoId,
			        	 etestQuestionId: jsonContent.etestQuestionId,
			        	 etestAnswerId: jsonContent.etestAnswerId,
			             etestName: jsonContent.etestName,
			             etestType: jsonContent.etestType,
			             questionType: jsonContent.questionType,
			             questionContents: jsonContent.questionContents,
			             fileNum: jsonContent.fileNum,
			             example1: jsonContent.example1,
			             example2: jsonContent.example2,
			             example3: jsonContent.example3,
			             example4: jsonContent.example4,
			             example5: jsonContent.example5,
			             example6: jsonContent.example6,
			             example7: jsonContent.example7,
			             example8: jsonContent.example8,
			             example9: jsonContent.example9,
			             example10: jsonContent.example10,
			             questionNo: jsonContent.questionNo,
			             questionCount: jsonContent.questionCount,
			             exampleCnt: jsonContent.exampleCnt,
			             learnerCnt: jsonContent.learnerCnt,
			             submitCnt: jsonContent.submitCnt,
			             correctAnswer: jsonContent.correctAnswer,
			             answerYn: jsonContent.answerYn,
			             correctDesc: jsonContent.correctDesc,
			             fileFullPath1: fileFullPath1,
			             fileFullPath2: fileFullPath2,
			             fileFullPath3: fileFullPath3
			        })
			     }
			});
		}
		//res.sendFile("C:/Work1/MOKWON_LMS6.1/LMSWebApp/nodejs/" + 'o2o_room_index.html');
		
        
	});
}