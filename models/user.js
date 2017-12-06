var sys = require('sys');
  
var client = require('mysql').createConnection({

        host:'localhost',

        user:'root',

        password:'abc',

        

    });
 
 function User(user) {
//   this.id=user.id;
  this.username = user.username;
  this.password = user.password;
//   this.nickname=user.nickname;
//   this.sex=user.sex;
//   this.email = user.email;
//   this.telephone=user.telephone;
//   this.address=user.address;
};

module.exports = User;

//把用户信息存到数据库中
User.prototype.save = function(callback) {


// client.connect(function(error, results) {
//   if(error) {
//     console.log('Connection Error1: ' + error.message);
//     return callback(error);
//   }
//   console.log('Connected to MySQL');
// //   ClientConnectionReady(client);
// });

// ClientConnectionReady=function(client){
client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		console.log('use tasteChallenge');
// 		ClientReady(client);
	});
// };

// ClientReady = function(client) 
// { 


// var values = [this.id,this.name,this.password,this.nickname,this.sex,this.email,this.telephone, this.address];
var values = [this.username,this.password];

client.query('INSERT INTO user SET username=?,password=?', values, function(error, results) { 
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
User.get = function(username, callback){
	

// ClientConnectionReady=function(client){
client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM user WHERE username=?',username,
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
	
	
	
//返回全部用户的信息
User.allget=function(callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM user ',
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
	
User.deleteOne=function(username,callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'DELETE FROM user WHERE username=?',username,
function selectCb(err, results, fields) { 
	
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 
// console.log(results.length);
// console.log('hello');
// if(results.length > 0) 

return callback(null);//成功！返回查询的用户信息

 
	
});
};	
	