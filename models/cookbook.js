var sys = require('sys');

var client = require('mysql').createConnection({

        host:'localhost',

        user:'root',

        password:'abcd',

        database:'tasteChallenge'

    });
    function Cookbook(){

    };
    module.exports = Cookbook;
    Cookbook.get = function(id,callback){
      client.query('use tasteChallenge',function(err,results){
       if(err){
         console.log(err);
         client.end();
         return callback(err);
       }
     });

     client.query( 'SELECT * FROM cookbook WHERE id=?',id,
       function selectDb(err, results, fields) {
       if (err) {
       console.log('GetData Error: ');
       client.end();
       return callback(err);
   }
   console.log(results[0].id);

   return callback(null,results);//成功！返回查询的用户信息



   });
    }
