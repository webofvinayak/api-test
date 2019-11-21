const express= require("express");
const bodyParser= require("body-parser");
const request =require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendfile(__dirname+"/index.html");
});

app.post("/",function(req,res){
console.log(req.body.crypto);

 request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",function(error,response,body){
 //console.log(body);
   
	 var data=JSON.parse(body);
	 var price= data.last;
	 console.log(price);

	 res.send("<h1> 'Current price of bitcoin in USD is"+price+"</h1>");
 
 });	

});


app.listen(3000,function(){
console.log("server is running on port 3000");
});
