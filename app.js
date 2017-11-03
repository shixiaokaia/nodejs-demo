
let express=require('express');

let bodyParser=require('body-parser');

let session=require('express-session');

let app=express();

app.listen(3000);

app.set('views','./views');

app.set('view engine','xtpl');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
	secret:'fad',
	resave:false,
	saveUninitaialized:false
}));

// app.use('/admin',(req,res,next)=>{
// 	if(!req.session.loginfo && req.url !='/login'){

// 	}
// 	next();
// })

app.use('/admin', (req, res, next) => {
    // 检测登录
    if(!req.session.loginfo && req.url != '/login') {
        return res.redirect('/login');
    }

    next();
})

let admin=require('./routes/admin');

let home=require('./routes/home');

app.use('/admin',admin);

app.use('/',home);