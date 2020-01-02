let nodemailer = require('nodemailer');
let email = {
    sends: function (emailUrl) {
        let transporter = nodemailer.createTransport({
            // 使用qq发送邮件
            // 更多请查看支持列表：https://nodemailer.com/smtp/well-known/
            service: 'qq',
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user: '593872818@qq.com',
                // 这里密码不是qq密码，是你设置的smtp授权码
                // 获取qq授权码请看:https://jingyan.baidu.com/article/6079ad0eb14aaa28fe86db5a.html
                pass: 'mcpviisjisqwbcaj',
            }
        });
        let now = new Date().getTime();
        let nowstr = String(Number(now))
        let nows = nowstr.substring(nowstr.length - 6, nowstr.length);

        let mailOpt = {
            from: `"WebChat" <593872818@qq.com>`, // 你到qq邮箱地址
            to: `${emailUrl}`, // 接受人,可以群发填写多个逗号分隔
            subject: '重置您的账户密码', // 主题名(邮件名)
            // 可以发送text或者html格式,2选1
            // text: 'Hello world?', // 纯文本
            html: `<b>您的验证码为${nows}</b>` // html
        };

        transporter.sendMail(mailOpt, (error, info = {}) => {
            if (error) {
                return console.log(error);
            }

        });
        return nows
    }
};
module.exports = email;
