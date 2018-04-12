const db      = require("../models");
const scrape  = require("./scrapes.js");


module.exports = function(app){

    app.get("/",(req,res)=>{

        /* Renders all all of the articles in the news template */

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
    
                    /* First finds all of the articles currently in the database */

                    let headlines = [];
    
                    oldNews.forEach(i => headlines.push(i.title)); // Stores their titles in headlines to prevent duplicate articles
    
                    scrape(newNews =>{
    
                        let doneCount = 0; // How many of the new articles have been checked against headlines
    
                        newNews.forEach((i)=>{
    
                            /* Creates new articles for titles not in headlines */

                            if(headlines.indexOf(i.title) == -1){
    
                                db.Article.create(i)
                                          .then((n)=>{
                                            console.log("created new article");
                                            doneCount++;
                                            if(doneCount == newNews.length) // If all of the articles have been iterrated through
                                                renderAll();                // Renders the news page
                                          })
                                          .catch( (err) => console.log(err) );
    
                            } else {
    
                                doneCount++;
                                if(doneCount == newNews.length) // Callback to see if all the articles have been iterated through
                                    renderAll();
    
                            }
    
                        });
    
                    });
    
        });
    
    });

    app.get("*",(req,res)=>{
        res.redirect("/");
    });
    

}