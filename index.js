const express= require("express");
const bodyParser= require("body-parser");
const request =require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendfile(__dirname+"/index.html");
});

app.post("/",function(req,res){

//console.log(req.body.crypto);

	var crypto=req.body.crypto;
	var fiat=  req.body.fiat;
	var am=    req.body.amount;

	//https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=INR&amount=1

	var baseURL="https://apiv2.bitcoinaverage.com/convert/global";
		
	var options={
		url:baseURL,
		method:"GET",
		qs: {
			from:crypto,
			to:fiat,
			amount:am,
		
	             }
                  }


 request(options,function(error,response,body){
 //console.log(body);
   
	 var data=JSON.parse(body);
	 var price= data.price;
	 console.log(price);

	 var currentDate=data.time;

	 res.write("<p> Current Date is "+currentDate+" </p>");

	 res.write("<h1>"+am+ " of "+crypto+" in "+fiat+ " is "+price+"</h1>");

	 res.write("<h1> vinayak Mandrekar from my localhost </h1>")

	 res.send();
 
 });	

});


app.listen(3000,function(){
console.log("server is running on port 3000");
});
