let express=require('express');
let mongodb=require('./mongo')
let objectId = require('mongodb').ObjectID;
const session = require('express-session');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(expressSession);

var bodyparser = require('body-parser');
const app=express();
app.use("/", express.static('static'));
app.use('/uploads', express.static('uploads'));
//使用 session 中间件
app.use(session({
    secret: 'secret key', //使用随机自定义字符串进行加密
    saveUninitialized: false,//不保存未初始化的cookie，也就是未登录的cookie
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, //设置cookie的过期时间为1天
        activeDuration: 5* 60*1000, // 激活时间，比如设置为30分钟，那么只要30分钟内用户有服务器的交互，那么就会被重新激活。
    }
}))

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
    res.redirect(req.session.lastpage)
    console.log(req.session)//session里面包含了存储的所有内容
    // if(req.session.username){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
    //
    //     res.send('1')
    // }else{
    //    res.send('-1')
    // }
});
app.post('/login',function (req,res) {
    let name=req.body.name;
    let pwd=req.body.pwd;
    mongodb.cha("user","root",{'name':name,'password':pwd}).then((resq,err)=>{
        if(resq.length==1){
            req.session.user = name;
            console.log(req.session+'11111111')
            res.send('1')
            // req.session.userName = req.body.username;//设置session
        }else{
            res.send('-1');

        }
    });
    //

});
http.listen(3001);