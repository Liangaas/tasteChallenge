var sys = require('sys');

var client = require('mysql').createConnection({

    host:'localhost',

    user:'root',

    password:'abc',

    database:'tasteChallenge'

});
function Comment(Comment){
  this.user_name=Comment.user_name;
  this.comment_message=Comment.comment_message;
};
module.exports = Comment;

Comment.prototype.save = function(callback) {


// client.connect(function(error, results) {
//   if(error) {
//     console.log('Connection Error1: ' + error.message);
//     return callback(error);
//   }
//   console.log('Connected to MySQL');
// //   ClientConnectionReady(client);
// });

// ClientConnectionReady=function(client){
    client.query('use tasteChallenge',function(err,results) {
        if (err) {
            console.log(err);
            client.end();
            return callback(err);
        }
        console.log('use tasteChallenge');
      });
var values=[this.user_name,this.comment_message];
        client.query('INSERT INTO comment SET user_name=?,comment_message=?', values, function(error, results) {
                if(error) {
                    console.log("ClientReady Error: " + error.message);
                    client.end();
                    return callback(err);
                }
            return callback(null,results[0]);
            });};

Comment.get = function(page,callback){
    client.query('use tasteChallenge',function(err,results){
        if(err){
            console.log(err);
            client.end();
            return callback(err);
        }
    });

    client.query( 'SELECT * FROM comment ',page,
        function selectDb(err, results, fields) {
            if (err) {
                console.log('GetData Error: ');
                client.end();
                return callback(err);
            }
            console.log(results[0].id);

            return callback(null,results);//成功！返回查询的用户信息



        });};

Comment.allget=function(callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'SELECT * FROM comment ',
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

Comment.deleteOne=function(id,callback){
	client.query('use tasteChallenge',function(err,results){
		if(err){
			console.log(err);
			client.end();
			return callback(err);
		}
		
	});
	

client.query( 'DELETE FROM comment WHERE id=? ',id,
function selectCb(err, results, fields) { 
	
if (err) { 

console.log('GetData Error: ' + error.message); 
client.end(); 
return callback(err);
} 


return callback(null);//成功！返回查询的用户信息

 
	
});
};
