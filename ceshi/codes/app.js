let express=require('express');
const app=new express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
app.use("/",express.static('static'));
app.get('/',function (req,res) {
  res.sendFile(__dirname+'/index.html')
});
io.on('connection',function (socket) {
  console.log(socket.id)
  socket.on('send-msg', function (msg) {
    console.log(socket.id + '当前的')
    console.log(msg)

    io.emit("msg", msg)
  })
})
http.listen(3001);