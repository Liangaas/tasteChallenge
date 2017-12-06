var sys = require('sys');
  
var client = require('mysql').createConnection({

        host:'localhost',

        user:'root',

        password:'abc',

        

    });
 function Caixi(){
	 
 };
 module.exports = Caixi;
 
 Caixi.get = function(caixiName,callback){
	 client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	client.query( 'SELECT * FROM caixi WHERE caixiName=?',caixiName,
    function selectDb(err, results, fields) { 
    if (err) { 
    console.log('GetData Error: ' + error.message); 
    client.end(); 
    return callback(err);
} 
// console.log(results.length);
// console.log('hello');
// if(results.length > 0) 
console.log(results[0]);

return callback(null,results);//成功！返回查询的用户信息

 
	
});
 }