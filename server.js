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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


scrape((r)=>{
    console.log(r);
})
