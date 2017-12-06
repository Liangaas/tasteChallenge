var express = require('express');
var router = express.Router();

var User= require('../models/user.js');
var Caixi=require('../models/caixi.js');
var Manager=require('../models/Manager.js');
var UserOpinions=require('../models/userOpinions.js');
var Comment=require('../models/comment.js');
var Cookbook=require('../models/cookbook.js');


module.exports = function(app) {
	app.get('/', function (req, res) {
    res.render('index', { title: '味蕾挑战' });
  });
  
  app.get('/map', checkLogin);
  app.get('/map', function (req, res) {
    res.render('map', { title: '味蕾挑战' });  
  });
  
  app.get('/caixi',function(req,res){
	  var caixiName=req.query.name;
	  console.log(caixiName);
	  Caixi.get( caixiName,function(err,results){
		    if(!results){
			    console.log('没有此菜系相关的菜品');
			    return res.redirect('/');
		    }
		    console.log('这种菜系有这么多:'+results.length);
		    
		    res.render('caixi',{
		    title:'菜系',
		    length:results.length,
			results:results
		   
		    
	    });
		   
  });
  });
  
  app.get('/cookbook',function(req,res){
				 var id=req.query.number;
				 console.log('id='+id);
				 Cookbook.get( id,function(err,results){
						if(!results){
							console.log('没有此id相关的cookbook');
							return res.redirect('/'); }
							res.render('cookbook',{
						  title:'菜谱',
						 results:results
			}); });});


  
  app.get('/reg',checkNotLogin);
  app.get('/reg', function (req, res) {
    res.render('reg', { title: '注册' });
  });
  
  app.post('/reg',checkNotLogin);
  app.post('/reg', function (req, res) {
	  var username = req.body.username,
      password = req.body.password;      
      
 
  var newUser = new User({
      username:username,
      password: password
  });

  
  //检查用户名是否已经存在 
   User.get(newUser.username, function (err, results) {
	
	   console.log(newUser.username);
    if (err) {
//       req.flash('error', err);
      console.log('错误');
      return res.redirect('/');
    }
    if (results.length>0) {
      //req.flash('error', '用户已存在!');
      console.log('用户已存在!');
      return res.redirect('/reg');//返回注册页
     }
    //如果不存在则新增用户
    newUser.save(function (err, newUser) {
      if (err) {
       // req.flash('error', err);
        return res.redirect('/reg');//注册失败返回主册页
      }
      // session(newUser);
      // console.log(session);
       console.log("注册成功");
       
//       req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    });
  });
});




   //登陆
    app.get('/login',checkNotLogin);
    app.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
  });
  app.post('/login',checkNotLogin);
  app.post('/login', function (req, res) {
	
  
  //检查用户是否存在
  User.get(req.body.username,function(err, results) {
    if (!results) {
      console.log('用户不存在!'); 
      return res.redirect('/login');//用户不存在则跳转到登录页
    }
    //检查密码是否一致
    if(results.length==0){
	    console.log('用户不存在');
	    return res.redirect('/login');
    }
    if (results[0].password != req.body.password) {
      console.log('密码错误!'); 
      return res.redirect('/login');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user=results[0];
    
    console.log('登陆成功!');
   
    res.redirect('/map');//登陆成功后跳转到地图页面
  });
  });
  
  app.get('/logout', checkLogin);
  app.get('/logout', function (req, res) {
    req.session.user = null;
    console.log('登出成功!');
    res.redirect('/');
  });
  
  
  
 app.get('/userOpinions', checkLogin); 
 app.get('/userOpinions', function (req, res) {
    res.render('userOpinions', { title: '用户反馈意见' });
  });
 app.post('/userOpinions',checkLogin);
 app.post('/userOpinions',function(req,res){
	 console.log(req.body.starnum);
	 console.log(req.body.DESCRIPTION);	 
	 console.log(req.session.user.username);
	 var newUserOpinions = new UserOpinions({
      username:req.session.user.username,
      starnum: req.body.starnum,
      description:req.body.DESCRIPTION      
  });
    newUserOpinions.save(function (err, newUserOpinions) {
      if (err) {
     
        return res.redirect('/userOpinions');//用户反馈意见返回用户反馈意见页面
      }
       console.log("用户反馈意见成功");
       
      res.redirect('/');//用户反馈意见成功后返回主页
    });

	 
	 
 });
//页面权限控制，把用户登陆状态的检查放到路由中间件，在每个路径前增加路由中间件。即可以实现页面控制权限  
  
  function checkLogin(req, res, next) {
    if (!req.session.user) {
      console.log('未登录!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      console.log( '已登录!'); 
      res.redirect('back');
    }
    next();
  }
  
  function checkManageSign_in(req, res, next) {
    if (!req.session.manage) {
      console.log('管理员未登录!'); 
      res.redirect('/sign-in');
    }
    next();
  }
  
  
  function checkNotManageSign_in(req,res,next){
	  if(req.session.manage){
		  res.redirect('back');
	  }
	  next();
  }

  
   app.get('/comments', checkLogin); 
   app.get('/comments',function(req,res){
        var pagenumber=req.query.page;
        console.log('page='+pagenumber);
        Comment.get( pagenumber,function(err,results){
            if(!results){
                console.log('没有此page相关的comment');
                return res.redirect('/'); }
            res.render('comment',{
                title:'评论',
                results:results
            }); });});
 app.post('/comments', checkLogin); 
app.post('/comments',function(req,res){
    var comment_message=req.body.comment_message;
    var newComment=new Comment({
	    user_name:req.session.user.username,
        comment_message:comment_message
    });
    Comment.get(newComment.user_name,function(err,results){
        newComment.save(function(err, newComment){
           if(err){
               return res.redirect('/map');
           }
           console.log("评论成功");
               return res.redirect('/comments?page=1');
        })
    });
});


  

  
// 
//  app.get('/sign-up',checkNotManageSign_in);
// app.get('/sign-up', function (req, res) {
//     res.render('sign-up', { title: '管理注册' });
//   });
// 
//  app.post('/sign-up',checkNotManageSign_in);
//  app.post('/sign-up', function (req, res) {
// 	  var managerID = req.body.managerID,
// 	  managerName = req.body.managerName,
//       managerPassword = req.body.managerPassword;      
//       
//  
//   var newManager = new Manager({
// 	  managerID:managerID,
//       managerName:managerName,
//       managerPassword: managerPassword
//   });
// 
//   
//   //检查用户名是否已经存在 
//    Manager.get(newManager.managerID, function (err, results) {
// 	
// 	   
//     if (err) {
// //       req.flash('error', err);
//       console.log('错误');
//       return res.redirect('/');
//     }
//     if (results.length>0) {
//       //req.flash('error', '用户已存在!');
//       console.log('管理员已存在!');
//       return res.redirect('/sign-up');//返回注册页
//      }
//     //如果不存在则新增用户
//     newManager.save(function (err, newManager) {
//       if (err) {
//        // req.flash('error', err);
//         return res.redirect('/sign-up');//注册失败返回主册页
//       }
//       // session(newUser);
//       // console.log(session);
//        console.log("注册成功");
//        
// //       req.flash('success', '注册成功!');
//       res.redirect('/manage');
//     });
//   });
// });

app.get('/sign-in',checkNotManageSign_in);
app.get('/sign-in', function (req, res) {
    res.render('sign-in', { title: '管理登陆' });
  });
  
app.post('/sign-in',checkNotManageSign_in);
app.post('/sign-in', function (req, res) {
	
  
  //检查管理员是否存在
  Manager.get(req.body.managerID,function(err, results) {
    if (!results) {
      console.log('管理员不存在!'); 
      return res.redirect('/sign-in');//用户不存在则跳转到登录页
    }
   
    if(results.length==0){
	    console.log('管理员不存在');
	    return res.redirect('/sign-in');
    }
      //检查密码是否一致
    if (results[0].managerPassword != req.body.managerPassword) {
      console.log('密码错误!'); 
      return res.redirect('/sign-in');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.managerName=results[0].managerName;
    console.log('管理员登陆成功!');
    req.session.manage=results;
    res.redirect('/manage');//登陆成功后跳转到地图页面
  });
  });
  
  app.get('/sign-out', checkManageSign_in);
  app.get('/sign-out', function (req, res) {
    req.session.manage = null;
    console.log('管理员登出成功!');
    res.redirect('/');
  });  

  
app.get('/manage', checkManageSign_in); 
app.get('/manage', function (req, res) {
	
	User.allget(function(err,results){
          req.session.usernum= results.length;
	});
	UserOpinions.allget(function(err,results){
    res.render('manage', { title: '管理',
	                      usernum:req.session.usernum,
		                  opinionsnum: results.length});
	});
	
	  
  });
  

app.get('/users', function (req, res) {
	User.allget(function(err,results){
		if (!results) {
      console.log('用户不存在!'); 
      return res.redirect('/manage');//用户不存在则跳转到登录页
    }
    console.log(results[0].username);
    res.render('users', { title: '管理',
		                  results: results});
	});
	    
  });
 app.post('/users',function(req,res){

	var username=req.body.deleteOne;
	console.log(username);
	User.deleteOne(username,function(err){
		if (err) {
   
        return res.redirect('/users');//注册失败返回主册页
      }
      console.log("删除成功");
      res.redirect('/manage');
      
	});
 });
  
  
  
app.get('/showcomment', function (req, res) {
    Comment.allget(function(err,results){
		if (!results) {
      console.log('comment不存在!'); 
      return res.redirect('/manage');//用户不存在则跳转到登录页
    }
    res.render('showcomment', { title: '管理',
		                  results: results});
	});
  });
  
  app.post('/showcomment',function(req,res){
	
	var id=req.body.deleteOpinion;
	
	Comment.deleteOne(id,function(err){
		if (err) {
   
        return res.redirect('/showcomment');//注册失败返回主册页
      }
      console.log("删除成功");
      res.redirect('/manage');
      
	});
 });
  
app.get('/opinions', function (req, res) {
	UserOpinions.allget(function(err,results){
		if (!results) {
      console.log('评论不存在!'); 
      return res.redirect('/manage');//用户不存在则跳转到登录页
    }
    res.render('opinions', { title: '管理',
		                  results: results});
	});
    
  });

app.post('/opinions',function(req,res){
	
	var id=req.body.deleteOpinion;
	
	UserOpinions.deleteOne(id,function(err){
		if (err) {
   
        return res.redirect('/opinions');//注册失败返回主册页
      }
      console.log("删除成功");
      res.redirect('/manage');
      
	});
 });


app.get('/feedback', function (req, res) {
    res.render('feedback', { title: '管理' });
  });
app.post('/feedback',function(req,res){
	var id=req.body.opinionId;
	var feedback=req.body.Feedback;
	UserOpinions.addFeedback(id,feedback,function(err){
		if (err) {
   
        return res.redirect('/feedback');
      }
      
      res.redirect('/manage');
	});
});

app.get('/showfeedback',function(req,res){
	UserOpinions.getfeedback(req.session.user.username,function(err,results){
		if(err){
			return res.redirect('/');
		}
		console.log(results);
		res.render('showfeedback',{
			title:'显示管理页面',
			results:results
		});
	});
	});
	


 
}