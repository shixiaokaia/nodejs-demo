let express=require('express');

let post=require('../models/post');

let user=require('../models/user');

let admin=express.Router();

admin.get('/',(req,res)=>{
	res.render('admin/index',{});
});

admin.get('/add', (req, res) => {
    res.render('admin/add', {});
})

admin.get('/add',(req,res)=>{

	req.body.uid=req.session.loginfo.id;

	post.insert(req.body,(err)=>{

		if(!err){
			res.json({
				code:10000,
				msg:'添加成功！'
			})
		}
	})
	
});

admin.get('/repass',(req,res)=>{
	res.render('admin/repass',{});
});

admin.get('/settings',(req,res)=>{

	let uid=req.session.loginfo.id;

	user.find(uid,(err,rows)=>{
		console.log(err);

		if(!err){
			res.render('admin/settings',{user: rows[0]});
		}
	})
	
});

admin.get('/list',(req,res)=>{

	post.findAll((err,rows)=>{
		if(err){
			return res.send('数据库错误！');
		}
		res.render('admin/list',{post:rows});
	})
	
});

admin.get('/logout',(req,res)=>{
	req.session.loginfo=null;

	res.redirect('/login');
})

admin.get('/delete',(req,res)=>{
	post.delete(req.query.id,(err)=>{

		if(!err){
			res.json({
				code:10000,
				msg:'删除成功！'
			})
		}
	})
})

admin.post('/update',(req,res)=>{
console.log(req.body);
	let uid=req.session.loginfo.id;

	user.update(uid,req.body,(err)=>{
		if(!err){
			res.json({
				code:10000,
				msg:'更新成功！'
			})
		}
	})
})

module.exports=admin;

