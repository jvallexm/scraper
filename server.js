const express     = require("express");
const port        = process.env.PORT || 8080; // Initialize the port
const app         = express();                // Initializes express
const bodyParser  = require("body-parser");
const path        = require("path");
const exphbs      = require("express-handlebars");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const mongoose    = require("mongoose");
const passport    = require("passport");

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false }) ); 
app.use( bodyParser.json()                          );
app.use(express.static(path.join(__dirname, 'public')));

const engine = {

    defaultLayout: "main",
    partialsDir: path.join(__dirname + `/views/partials`)

};

mongoose.connect(MONGODB_URI);

/* Handlebars Middlewear */

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

require( "./routes/authRoutes" )(app,passport);
require( "./routes/apiRoutes"  )(app);
require( "./routes/htmlRoutes" )(app);


