var sys = require('sys');
  
var client = require('mysql').createConnection({

        host:'localhost',

        user:'root',

        password:'abc',

        

    });
 
 function Manager(manager) {
  this.managerID=manager.managerID;
  this.managerName = manager.managerName;
  this.managerPassword = manager.managerPassword;

};

module.exports = Manager;

//把用户信息存到数据库中
Manager.prototype.save = function(callback) {


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
		
// 		ClientReady(client);
	});
// };

// ClientReady = function(client) 
// { 


// var values = [this.id,this.name,this.password,this.nickname,this.sex,this.email,this.telephone, this.address];
var values = [this.managerID,this.managerName,this.managerPassword];

client.query('INSERT INTO manager SET managerID=?, managerName=?,managerPassword=?', values, function(error, results) { 
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
Manager.get = function(managerID, callback){
	

// ClientConnectionReady=function(client){
client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM manager WHERE managerID=?',managerID,
function selectCb(err, results, fields) { 
	console.log(managerID);
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
	
	
	