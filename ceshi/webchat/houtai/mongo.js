let MongoClient = require('mongodb').MongoClient;
let mongodb={
    //dbname  数据库名字
    //tabname  表名字
    cha:function (dbname,tabname,value) {
         return new Promise(resolve => {
             let url=`mongodb://localhost:27017`;
             MongoClient.connect(url,{ useNewUrlParser: true},(err,db)=>{
                    let dbo=db.db(dbname);
                    dbo.collection(tabname).find(value).toArray((err,result)=>{
                        if(!err){
                            resolve (result)
                        }else{
                           return false;
                        }
                    })
             })
         })
    }
    //  zeng:function (dbname,tabname,username,password) {
    //      return new Promise(resolve => {
    //
    //          let model=modela.cha(tabname);
    //          let names={"name":username};
    //          model.find(names,(err,result)=>{
    //              if(!err){
    //                  if(result.length===0){
    //                      let data=new model({name:username,password:password});
    //                      data.save(err=>{
    //                          if(!err){
    //                              resolve('添加成功')
    //                          }else{
    //                              resolve('添加失败')
    //                          }
    //                      });
    //                  }else{
    //                      resolve('已该用户，请重新命名');
    //                      return false;
    //                  }
    //              }else{
    //                  resolve('网络出现问题,请检查您的网络');
    //                  return false;
    //              }
    //          });
    //      })
    //
    //  },
    //  cha:function (dbname,tabname,username,password) {
    //      let model=modela.cha(tabname);
    //      return new Promise(resolve => {
    //          mongoose.connect(`mongodb://localhost/${dbname}`);
    //          console.log(model);
    //         let  pwd={"name":username,"password":password};
    //          model.find(pwd,(err,result)=>{
    //                if(!err){
    //
    //                    resolve(result)
    //                }
    //          });
    //      })
    //  }
};
module.exports=mongodb;
