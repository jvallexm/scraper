const express    = require("express");
const port       = process.env.PORT || 8080; // Initialize the port
const app        = express();                // Initializes express
const bodyParser = require("body-parser");
const path       = require("path");
const exphbs     = require("express-handlebars");
const scrape     = require("./routes/scrapes.js");

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false }) ); 
app.use( bodyParser.json()                          );
app.use(express.static(path.join(__dirname, 'public')));

const engine = {

    defaultLayout: "main",
    partialsDir: path.join(__dirname + `/views/partials`)

};

/* Handlebars Middlewear */

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

app.get("*",(req,res)=>{
    scrape((articles)=>{
        res.render("news",{articles: articles});
    })
})

scrape((r)=>{
    console.log(r);
})
