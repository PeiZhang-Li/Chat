let express = require('express');
let mongodb = require('./mongo');
let objectId = require('mongodb').ObjectID;

var bodyparser = require('body-parser');
let emails = require('./sendemail')
const app = express();
app.use("/", express.static('static'));
app.use('/uploads', express.static('uploads'));

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

});
app.post('/login',function (req,res) {
    let email = req.body.email;
    let pwd = req.body.pwd;
    mongodb.cha("user", "root", {'email': email, 'password': pwd}).then((resq, err) => {
        if (resq.length == 1) {

            res.send('1');
        } else {
            res.send('-1');
        }
    });

});
app.post('/register', function (req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    let email = req.body.email;
    mongodb.zeng("user", "root", email, name, pwd).then((resq) => {
        if (resq === 1) {
            res.send('1')
        } else {
            res.send('-1')
        }
    })
});
let yzcode = '';
app.post('/Getback', function (req, res) {
    let email = req.body.email;
    yzcode = emails.sends(email);
    res.send('1')
});
http.listen(3001);