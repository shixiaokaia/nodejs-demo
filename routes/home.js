let express=require('express');

let user=require('../models/user');

let home=express.Router();

home.get('/',(req,res)=>{
	res.render('home/index',{});

});

home.get('/article',(req,res)=>{
	res.render('home/article',{});
})

home.get('/about',(req,res)=>{
	res.render('home/about',{});
})

home.get('/center',(req,res)=>{
	res.render('home/center',{});
})

home.get('/join',(req,res)=>{
	res.render('home/join',{});
})

home.get('/login',(req,res)=>{
	res.render('home/login',{});
})

home.get('/register',(req,res)=>{
	res.render('home/register',{});
})

home.post('/register',(req,res)=>{
	user.insert(req.body,(err)=>{
		if(!err){
			res.json({
				code:10000,
				msg:'添加成功！'
			});
		}
	});
})

home.post('/login',(req,res)=>{
	user.auth(req.body.email,req.body.pass,(err,row)=>{
		if(!err){
			req.session.loginfo=row;

			res.json({
				code:10000,
				msg:'登录成功！'
			})
		}
	})
})

module.exports=home;