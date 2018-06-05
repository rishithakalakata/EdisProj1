var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql'); 
var cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app. use(session({cookieName:'session', secret: 'rishitha1995', duration: 15*60*100, activeDuration: 5 * 60 * 1000,resave: false ,  saveUninitialized: true}));


var condb = mysql.createConnection({
	host: "localhost",
	user: "Rishitha",
	password: "phoenix7",
	database: "edisproj1"
}
);


app.post('/login', function(req, res){


//var sessionAuth=req.session;
//console.log("req.session.username"+req.session.name);

console.log("req.body.username"+req.body.username);
console.log("req.body.password"+req.body.password);

username = req.body.username;
password = req.body.password;
	//if (typeof username != 'undefined' && (typeof req.session.username == 'undefined' || req.session.username === "" || req.session.username === undefined)){

		console.log('Db connection established');
		condb.query('select * from userdata where username=? and password=?', [username,password], function(err,rows){

			if(err)
				throw err;
			

			else if(rows.length==0){
				res.send("There seems to be an issue with the username/password combination that you entered");
			}

			else{
				req.session.username = true;
				res.send('Welcome' + " " + rows[0].username);
			}
	});
	//}

	//else{
	//	res.json("you are already logged in");
 	// }
});


//if ((!req.query.username) || (!req.query.password))
//{
//res.send("incorrect username or password. login failed");
//}
//else
//{
//res.send("login success");
//}
//});


app.post('/add', function(req, res){
	console.log('addition');
	console.log(req.session.username);
	if(req.session.username){
		var num1 = req.body.num1;
		var num2 =req.body.num2;
		console.log(""+num1);
		console.log(""+num2);
		//res.send("the action was successful");
		
		res.send({'result': (num1-0)+(num2-0)});
	}	

else {
	res.json("you are not currently logged in");

	}
});



app.post('/multiply', function(req, res){
	if(req.session.username){
		var num1 = req.body.num1;
		var num2 =req.body.num2;
		//res.send("the action was successful");
		res.send({'result': (num1-0)*(num2-0)});
	}	

	else {
		res.json("you are not currently logged in");
	}

}
);



app.post('/divide', function(req, res){
	if(req.session.username){
		var num1 = req.body.num1;
		var num2 =req.body.num2;

		if((num2-0)==0){
			res.json("The numbers you entered are not valid");
		}
		else{
		//res.send("the action was successful");
		res.send({'result': (num1-0) / (num2-0)});
		}
	}	

	else {
		res.json("you are not currently logged in");	
	}
}
);

app.post('/logout', function(req,res){
	if(req.session.username){
		req.session.destroy();
		res.json("You have been successfully logged out");
	}

	else{
		res.json("You are not currently logged in");
	}
}
);

app.listen(8000);

