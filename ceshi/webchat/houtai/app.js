let express = require('express');
let mongodb = require('./mongo');
let objectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
let bodyparser = require('body-parser');
let fs = require('fs');
let emails = require('./sendemail');
const app = express();
app.use("/", express.static('static'));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
const http=require('http').Server(app);
//跨域处理
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
    mongodb.zeng("user", "root", {'name': name, 'password': pwd, 'email': email}).then((resq) => {
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
    emails.sends(email).then(resq => {
        yzcode = resq;
        if (yzcode == '-1') {
            res.send('-1')
        } else {
            res.send('1')
            setTimeout(() => {
                yzcode = ''
            }, 60000);//设置一分钟过期
        }
    });

});
app.post('/modify', function (req, res) {
    //找回密码
    let email = req.body.email;
    let password = req.body.password;
    let code = req.body.yzcode;
    if (code == yzcode) {
        mongodb.xiu("user", "root", {'email': email}, {'password': password}).then((resd) => {
            if (resd == 1) {
                res.send('1')
            } else {
                res.send('-1')
            }

        })
    } else {
        res.send('-1')
    }
});
app.post('/username', function (req, res) {
    //获取用户信息
    let email = req.body.email;

    mongodb.cha("user", "root", {'email': email}).then((resq) => {
        if (resq.length === 1) {
            //   resq[0]
            mongodb.cha("user", "userimg", {'email': email}).then(resw => {
                if (resw.length === 1) {
                    res.send({'name': resq[0], 'userimg': resw[0]})
                } else {
                    res.send({'name': resq[0], 'userimg': '-1'})
                }
            })
        }

    })
});
app.post('/adduserinfo', function (req, res) {
    //编辑信息部分
    //1.获取参数的值
    //fields正常post传递的参数
    //files文件上传的信息
    let form = new multiparty.Form();
    form.uploadDir = "uploads"; //设置文件上传的目录
    form.parse(req, (err, fields, files) => {
        let username = fields.username[0];//提交上来的用户名
        let email = fields.emali[0];//用户邮箱，作为唯一凭证去查询
        let filepath = files.userimg[0].path;//文件路径
        let filesize = files.userimg[0].size;//文件大小
        mongodb.cha("user", "userimg", {'email': email}).then((resq) => {
            if (resq.length === 0) {
                //找不到则储存
                mongodb.zeng("user", "userimg", {'email': email, 'path': filepath});
                //修改用户信息
                mongodb.xiu("user", "root", {'email': email}, {'name': username});

                res.send("<script>alert('成功');history.back(1)</script>")
            } else {
                //找到
                let oldpath = resq[0].path;
                if (filesize === 0) {//如果文件大小为0删除上传上来的垃圾文件,并且根据找到的上次地址进行储存（就是没有改变头像）
                    fs.unlink(filepath, () => {
                        mongodb.xiu("user", "root", {'email': email}, {'name': username});
                        mongodb.xiu("user", "userimg", {'email': email}, {'path': oldpath});
                        res.send("<script>alert('成功');history.back(1)</script>")
                    })
                } else {//如果确实更新了图片,就删除旧的图片，更新数据
                    fs.unlink(oldpath, () => {
                        mongodb.xiu("user", "root", {'email': email}, {'name': username});
                        mongodb.xiu("user", "userimg", {'email': email}, {'path': filepath});
                        res.send("<script>alert('成功');history.back(1)</script>")
                    })
                }
            }

        })


    })

})
http.listen(3001);