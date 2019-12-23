let express=require('express');
let mongodb=require('./mongo')
let objectId = require('mongodb').ObjectID
var session = require('express-session');
var bodyparser = require('body-parser');
const app=express();
app.use("/", express.static('static'));
app.use('/uploads', express.static('uploads'));
// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
const http=require('http').Server(app);
//跨越处理
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
//各个路由模块
//后台登录模块
app.get('/',(req,res)=>{
    // mongodb.zeng("user","root","admin","admin123").then((resa,err)=>{
    //     res.send(resa)
    // });//增加

});
app.post('/login',function (req,res) {
    let name=req.body.name;
    let pwd=req.body.pwd;
    mongodb.cha("user","root",name,pwd).then((resq,err)=>{
        if(resq.length==1){
            res.send('1');
        }else{
            res.send('-1');
            // req.session.userName = req.body.username;
        }
    });
    //

});
http.listen(3001);