let mongoose=require('mongoose');
let mongodb={
    //dbname  数据库名字
    //tabname  表名字
     zeng:function (dbname,tabname,username,password) {
         return new Promise(resolve => {
             mongoose.connect(`mongodb://localhost/${dbname}`);
             let zs=mongoose.Schema({
                 name:String,
                 password:String
             });
             let model=mongoose.model(tabname,zs);
             let names={"name":username};
             model.find(names,(err,result)=>{
                 if(!err){
                     if(result.length===0){
                         let data=new model({name:username,password:password});
                         data.save(err=>{
                             if(!err){
                                 resolve('添加成功')
                             }else{
                                 resolve('添加失败')
                             }
                         });
                     }else{
                         resolve('已该用户，请重新命名');
                         return false;
                     }
                 }else{
                     resolve('网络出现问题,请检查您的网络');
                     return false;
                 }
             });
         })

     },
     cha:function (dbname,tabname,username,password) {
         return new Promise(resolve => {
             mongoose.connect(`mongodb://localhost/${dbname}`);
             let zs=mongoose.Schema({
                 name:String,
                 password:String
             });
             let model=mongoose.model(tabname,zs);
             let pwd={"name":username,"password":password};
             model.find(pwd,(err,result)=>{
                   if(!err){

                       resolve(result)
                   }
             });
         })
     }
};
module.exports=mongodb;
