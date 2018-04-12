const db      = require("../models");
const scrape  = require("./scrapes.js");


module.exports = function(app){

    app.get("/news",(req,res)=>{

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
    

}