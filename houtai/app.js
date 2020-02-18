let express = require('express');
let mongodb = require('./mongo');
let objectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
let bodyparser = require('body-parser');
let fs = require('fs');
let _ = require('underscore');
let emails = require('./sendemail');
const app = express();
app.use("/", express.static('static'));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
const http = require('http').Server(app);
const io = require('socket.io')(http);
//跨域处理
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
let hashName = [];//存储用户的数组
io.on('connection', function (socket) {
    // 不管是服务器还是客户端都有 emit (发送)和 on(接收,监听) 这两个函数，socket.io 的核心就是这两个函数
    socket.on('setRoom', function (data) {//这一层用来检测所有线上的用户
        let name = data;
        // // 储存上线的用户,并且分配ID
        hashName[name] = socket.id;
    });
    //向指定目标,发送消息
    socket.on('sayTo', function (data) {

        let toName = data.friend||data.emali;//目标用户
        let email = data.email||data.myemali;//起始用户
        let date = data.date;//添加时间
        var toId;
        if (toId = hashName[toName]) {
            var toSocket = _.findWhere(io.sockets.sockets, {id: toId});
           if(data.info===1){
               toSocket.emit('message', data);
               mongodb.zeng('user','msg',data);
           }else if(data.info===2){
               let myemali=data.emali;
               let emali=data.myemali;
               let obj={
                   myemali,
                   emali
               }
               mongodb.zeng('user','friend',obj).then((resqa,err)=>{
                   if(!err){
                       toSocket.emit('message', {'info':2,'status':'1'});
                   }
               })
            }
        } else {

            if(data.info===1){
                mongodb.zeng('user','msg',data);
            }

        }

    })
    //在线聊天部分
    socket.on('sendMsg',function (data) {
        let toName = data.friendemali;//目标用户
        let email = data.email;//起始用户
        let toId;
        if(toId= hashName[toName]){
            var toSocket = _.findWhere(io.sockets.sockets, {id: toId});
            toSocket.emit('msg',data)
        }else{
            //不在线则存储
            mongodb.zeng('user','weidu',data)
        }
    })
});
//各个路由模块


//后台登录模块
app.get('/', (req, res) => {

});
app.post('/login', function (req, res) {
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

                res.send("<script>alert('成功');history.go(-1)</script>")
            } else {
                //找到
                let oldpath = resq[0].path;
                if (filesize === 0) {//如果文件大小为0删除上传上来的垃圾文件,并且根据找到的上次地址进行储存（就是没有改变头像）
                    fs.unlink(filepath, () => {
                        mongodb.xiu("user", "root", {'email': email}, {'name': username});
                        mongodb.xiu("user", "userimg", {'email': email}, {'path': oldpath});
                        res.send("<script>alert('成功');history.go(-1)</script>")
                    })
                } else {//如果确实更新了图片,就删除旧的图片，更新数据
                    fs.unlink(oldpath, () => {
                        mongodb.xiu("user", "root", {'email': email}, {'name': username});
                        mongodb.xiu("user", "userimg", {'email': email}, {'path': filepath});
                        res.send("<script>alert('成功');history.go(-1)</script>")
                    })
                }
            }

        })


    })

});
app.post('/search', function (req, res) {
    let msg = req.body;
    let arrs = [];
    mongodb.cha("user", "root", msg).then((resq) => {

        if (resq.length !== 0) {
            resq.forEach((item, value) => {
                let email = item.email;
                //准备进行二次查询，查询头像地址
                mongodb.cha("user", "userimg", {'email': email}).then((resa) => {
                    if (resa.length !== 0) {
                        let path = `http://127.0.0.1:3001/${resa[0].path.replace("\\", "/")}`;
                        arrs.push({'name': item.name, 'email': item.email, 'path': path});

                    } else {
                        let path = '';
                        arrs.push({'name': item.name, 'email': item.email, 'path': path});
                    }


                    if (resq.length - 1 === value) {
                        res.send(arrs)
                    }
                });
            })
        } else {
            res.send(arrs)
        }
    });

});
app.post('/addfriend', function (req, res) {
    let obj = req.body;
    let friend = obj.friend;//目标用户
    let email = obj.email;//起始用户
    let date = obj.date;//添加时间
    res.end()
});
//检测用户是否有未读消息
app.post('/searchmsg',(req,res)=>{
   let email=req.body.email;
   mongodb.cha('user','msg',{'friend':email}).then(resq=>{
       if(resq.length!==0){
           res.send(resq)
       }else{
           res.send('-1');
       }
   });
});
//拒绝好友请求
app.post('/refuse',(req,res)=>{
    let date=req.body.date;
    mongodb.shan('user','msg',{'date':date}).then(resq=>{
       res.end()
    })
})
//添加好友处理
app.post('/adds',(req,res)=>{
   let emali=req.body.emali;
   let myemali=req.body.myemali;
   let obj={
       myemali,
       emali
   }
    mongodb.cha('user','friend',obj).then((resq)=>{
        if(resq.length!==0){
           return false;
        }else{
            mongodb.zeng('user','friend',obj).then((resqa,err)=>{
                if(!err){
                    res.end();
                }
            })
        }
    })
});
//查询好友列表
app.post('/searchfriend',(req,res)=>{
    let emali=req.body.emali;
     mongodb.cha('user','friend',{'myemali':emali}).then((resq)=>{
         if(resq.length!==0){
             res.send(resq)
         }else{
             res.send('-1');
         }
     })
});
//删除好友
app.post('/delfriend',(req,res)=>{
    let myemali=req.body.myemali;
    let emali=req.body.emali;
    mongodb.shan('user','friend',{'myemali':myemali,'emali':emali}).then((resq,err)=>{
        if(!err){
             mongodb.shan('user','friend',{'myemali':emali,'emali':myemali}).then(()=>{
                 res.end();
             })
        }
    })
});
//发送消息,储存聊天记录
app.post('/sendmsg',(req,res)=>{
     let msgitem=req.body;
     mongodb.zeng('user','ChatRecord',msgitem).then(()=>{
         res.end();
     })
});
app.post('/SearchChatRecord',(req,res)=>{
    let objs=req.body;
    mongodb.cha('user','ChatRecord',objs).then((resq)=>{
        res.send(resq)
    })
})
//查询不在线时的为读消息
app.post('/SearchWeidu',(req,res)=>{
   let email=req.body.email;
    mongodb.cha('user','weidu',{'friendemali':email}).then((resq)=>{
        res.send(resq)
    })
});
app.post('/DelWeidu',(req,res)=>{
    let email=req.body.email;
    mongodb.shan('user','weidu',{'friendemali':email}).then((resq)=>{
        res.end();
    })
});
//删除聊天记录
app.post('/DelChatRecord',(req,res)=>{
    let id=objectId(req.body.id);
    mongodb.shan('user','ChatRecord',{'_id':id})
})
app.post('/DelRecord',(req,res)=>{
      let msg=req.body;
    mongodb.shan('user','ChatRecord',msg)
})
http.listen(3001);