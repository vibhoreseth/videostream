var express=require('express');
var bp=require('body-parser');
var app=express();
var fs = require('fs');
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
var mc=require('mongodb').MongoClient;
var client=new mc("mongodb://localhost:27017",{useUnifiedTopology:true});

app.use((req, res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    express.static('./assets');
    client.connect((err)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("connected to db");
        var db=client.db("videostream");
        req.collection=db.collection("video");
        next();
      }
    })
   
});
app.get("/videolist",(req,res)=>{
  var video=req.collection;
  video.find().toArray((err,docs)=>{
    if(err){
      console.log("no videos");
    }
    else{
      res.send(docs);
    }
  })
})

app.get('/video/:url', function(req, res) {
    const path ="../assets/videos/His.Dark.Materials."+req.params.url+".mkv";
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

app.post("/search",(req,res)=>{
  var video=req.collection;
  var name=req.body.name;
  video.find({name:name}).toArray((err,docs)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(docs);
    }
  });
});

 app.listen(3000,()=>{
     console.log("server started..");
 });