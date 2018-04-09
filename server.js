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

mongoose.connect(MONGODB_URI);

/* Handlebars Middlewear */

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

app.get("*",(req,res)=>{

    function renderAll(){

        db.Article.find({}).then(all => 
            res.render("news",{articles: all.sort((a,b)=>{
                if(a.id > b.id)
                    return -1;
                else
                    return 1;
            })})
        );
    }

    db.Article.find({})
              .then((oldNews)=>{

                let headlines = [];

                oldNews.forEach(i => headlines.push(i.title));

                scrape(newNews =>{

                    let doneCount = 0;

                    newNews.forEach((i)=>{

                        if(headlines.indexOf(i.title) == -1){

                            db.Article.create(i)
                                      .then((n)=>{
                                        console.log("created new article");
                                        doneCount++;
                                        if(doneCount == newNews.length)
                                            renderAll();
                                      })
                                      .catch( (err) => console.log(err) );

                        } else {

                            doneCount++;
                            if(doneCount == newNews.length)
                                renderAll();

                        }

                    });

                });

              });

});
