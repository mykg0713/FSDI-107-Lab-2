

var http = require("http");
var express = require("express");

var app = express();

/**
 * CONFIGURATION
 */

 //enable CORS security
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requestd-With, Content-Type, Accept");
    next();
});



 //read req body as obj
 var bodyParser = require("body-parser");
 app.use(bodyParser.json());

 //to serve HTML conten
 var ejs = require('ejs');
 app.set('views', __dirname + '/public');
 app.engine('html', ejs.renderFile);
 app.set('view engine', ejs);

 //To server static files (css, js, images, documents, etc etc)
 app.use(express.static(__dirname + '/public'));



 //Mongoose connection
 var mongoose = require ("mongoose");
 mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
 var db = mongoose.connection;

 //Db obj constructor
  var ItemDB;
  var messageDB;





/**
 * 
 *  WEB SERVER FUNCTIONALITY
 */

app.get("/", function(req,res){
    res.render("index.html");
});

app.get("/contact", function(req, res){
    res.send("My contact info is: 123-4567, contact@mykul.com");
});

app.get("/about", function(req, res){
    res.send("Mykul Guillory");
});

app.get("/catalog", function(req, res){
    res.render('index.html');
});

app.get("/admin", function(req, res){
    res.render('admin.html');
});

app.get("/contact", function(req, res){
    res.render('contact.html');
});

/**
 * 
 * API FUNCTIONALITY
 * 
 */

 var items = [];
 var count = 0;

 app.get('/api/products', function (req,res){
     console.log("User wants the catalog");

     ItemDB.find({}, function(error, data){
         if(error){
             console.log("*** Error on retrieving", error);
             res.status(500);
             res.send(error);
         }

         res.status(200);
         res.json(data);
     });
 });

 app.get('/api/products/:user', function(req, res){
    var name = req.params.user;

    ItemDB.find({user: name }, function(error, data){
        if(error){
            console.log("*** Error on filtering", error);
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(data);

    });
 });

 app.get('/api/message/:user', function(req, res){
    var userName = req.params.user;

    messageDB.find({ user: userName}, function(error, data){
        if(error){
            console.log("*** Error on reading data", error);
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(data);

    });
 });

 app.post('/api/products', function(req, res){
     console.log("User wants to save item");

     //perform validation


    //read the item
     var item = req.body;
     
     //create a DB object
    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(function(error, savedItem){
        if(error){
            console.log("**Error saving item to DB", error);
            res.status(500); //500:  Internal Server Error
            res.send(error);
        }
        // no error, send the saved item back to client
        console.log("Item Saved Correctly");
        res.status(201);
        res.json(savedItem);
    });
 })

 app.post('/api/message', function(req,res){
     var msg = req.body;
    console.log("New Message from", msg.name);

    var msgForMongo = messageDB(req.body);
    msgForMongo.save(function(error, savedMsg){
        if(error){
            console.log("Error saving msg", error);
            res.status(500);
            res.send(error);
        }

        res.status(201); //created
        res.json(savedMsg);
    })

 });

// cath error on mongo connection
db.on('error', function(error){
    console.log("***Error connection to MongoDB");
});

// catch success on mongo connection
db.on('open', function(){
    console.log("It worked");

    //define a schema for the collection (Table)
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        image: String,
        user: String
    });
    
    var messageSchema = mongoose.Schema({
        name: String,
        mail: String,
        message: String,
        user: String
    });


    //create constructor(s) for the schema
    ItemDB = mongoose.model("itemsCH5", itemSchema);
    messageDB = mongoose.model("messagesCH5", messageSchema);
});

    






 app.listen(8080, function(){
    console.log("Server running at http://localhost:8080");   
});
