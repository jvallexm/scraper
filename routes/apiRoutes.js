const db          = require("../models");

module.exports = function(app){

    /* API Route to post a new comment to a single article */

    app.post(`/api/comment/`,(req,res)=>{

        console.log("trying to do a comment");

        console.log(req.body);

        db.Article.update({_id: req.body.id},{$push: {comments: req.body}})
                .then(res.send("ding"))
                .catch(err => res.send(err));

    });

    /* Finds all articles and returns them as a json object */

    app.get("/api/all",(req,res)=>{
        db.Article.find({})
                .then( all => res.json(all));
    });
    
}