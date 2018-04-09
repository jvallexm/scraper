const express     = require("express");
const port        = process.env.PORT || 8080; // Initialize the port
const app         = express();                // Initializes express
const bodyParser  = require("body-parser");
const path        = require("path");
const exphbs      = require("express-handlebars");
const scrape      = require("./routes/scrapes.js");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const mongoose    = require("mongoose");
const db          = require("./models");

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false }) ); 
app.use( bodyParser.json()                          );
app.use(express.static(path.join(__dirname, 'public')));

const engine = {

    defaultLayout: "main",
    partialsDir: path.join(__dirname + `/views/partials`)

};

scrape((articles)=>{
    articles.forEach(i=>{
        db.Article.create(i)
                  .then(  (n)   => console.log("created new article") )
                  .catch( (err) => console.log(err) );
    });
});

/* Handlebars Middlewear */

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

app.get("*",(req,res)=>{
    scrape((articles)=>{
        res.render("news",{articles: articles});
    })
});
