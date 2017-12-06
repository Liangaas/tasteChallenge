var sys = require('sys');
  
var client = require('mysql').createConnection({

        host:'localhost',

        user:'root',

        password:'abc',

        

    });
 
 function UserOpinions(userOpinions) {

  this.username = userOpinions.username;
  this.starnum = userOpinions.starnum;
  this.description=userOpinions.description;

};

module.exports = UserOpinions;

//把用户信息存到数据库中
UserOpinions.prototype.save = function(callback) {


client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		

	});

var values = [this.username,this.starnum,this.description];

client.query('INSERT INTO userOpinions SET username=?,starnum=?,description=?', values, function(error, results) { 
if(error) { 
console.log("ClientReady Error: " + error.message); 
client.end(); 
return callback(err);
} 


return callback(null,results[0]);
} 
); 
 
// } 

};

//读取用户信息
UserOpinions.get = function(username, callback){
	


client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM userOpinions WHERE username=?',username,
function selectCb(err, results, fields) { 
	console.log(username);
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 
// console.log(results.length);
// console.log('hello');
// if(results.length > 0) 

return callback(null,results);//成功！返回查询的用户信息

 
	
});
console.log('Connection closed1');	
// client.end();
// };

	};
	
UserOpinions.allget=function(callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM userOpinions ',
function selectCb(err, results, fields) { 
	
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 
// console.log(results.length);
// console.log('hello');
// if(results.length > 0) 

return callback(null,results);//成功！返回查询的用户信息

 
	
});

};	
	
	
UserOpinions.deleteOne=function(id,callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'DELETE FROM userOpinions WHERE id=? ',id,
function selectCb(err, results, fields) { 
	
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 


return callback(null);//成功！返回查询的用户信息

 
	
});
};	

UserOpinions.addFeedback =function(id,feedback,callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	
	var val = [feedback,id];
	
	client.query( 'UPDATE userOpinions SET feedback=? WHERE id=?',val,
    function selectCb(err, results, fields) { 
	
    if (err) { 

    console.log('GetData Error: ' + error.message); 
    client.end(); 
    return callback(err);
} 


return callback(null);
	
});
};

UserOpinions.getfeedback = function(username, callback){
	


client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM userOpinions WHERE username=?',username,
function selectCb(err, results, fields) { 
	
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 


return callback(null,results);//成功！返回查询的用户信息

 
	
});


	};


	