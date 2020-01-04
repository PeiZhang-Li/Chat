let MongoClient = require('mongodb').MongoClient;
let url = `mongodb://localhost:27017`;
let mongodb = {
    //dbname  数据库名字
    //tabname  表名字
    cha: function (dbname, tabname, value) {
        return new Promise(resolve => {

            MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
                let dbo = db.db(dbname);
                dbo.collection(tabname).find(value).toArray((err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        return false;
                    }
                })
            })
        })
    },
    zeng: function (dbname, tabname, value) {
        return new Promise(resolve => {
            this.cha(dbname, tabname, value).then(res => {
                if (res.length == 1) {
                    resolve(-1)
                } else {
                    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
                        let dbo = db.db(dbname);
                        dbo.collection(tabname).insertOne(value, function (err, res) {
                            if (!err) {
                                resolve(1)
                            }
                        });
                    })
                }
            })

        })
    },
    xiu: function (dbname, tabname, email, value) {
        return new Promise(resolve => {
            MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
                let dbo = db.db(dbname);
                dbo.collection(tabname).updateOne(email, {$set: value}, (err) => {
                    if (!err) {
                        resolve('1')
                    } else {
                        resolve('-1')
                    }
                })
            })
        })
    }
};
module.exports=mongodb;
