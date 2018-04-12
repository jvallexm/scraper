const db          = require("../models");

module.exports = function(app){

    app.post(`/api/comment/`,(req,res)=>{

        console.log("trying to do a comment" + JSON.stringify(req.body));

        db.Article.update({_id: req.body.id},{$push: {comments: req.body.comment}})
                .then(res.send("ding"))
                .catch(err => res.send(err));

    });

    app.get("/api/all",(req,res)=>{
        db.Article.find({})
                .then( all => res.json(all));
    });
    
}