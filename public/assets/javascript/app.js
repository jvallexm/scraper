$(document).ready(()=>{

    function newComment(user,comment){

        let panel   = $("<div>").addClass("panel panel-comment");
        let heading = $("<div>").addClass("panel-heading comment-head").text(`${user} Says...`);
        let body    = $("<div>").addClass("panel-body comment-body").text(comment);

        panel.append(heading).append(body);

        return panel;

    }

    $(".show").on("click",function(){

        let id = $(this).attr("data-id");
        console.log(id);

        if( $("#comments-" + id).hasClass("hidden") ){

            $("#comments-" + id).removeClass("hidden");
            $("#show-" + id).text("Hide");

        }else{

            $("#comments-" + id).addClass("hidden");
            $("#show-" + id).text("Show");

        }

    });

    $(".panel-heading").on("click",function(){
        window.open($(this).attr("data-link"));
    });

    $("form").on("submit",function(e){

        e.preventDefault();
        let id = $(this).attr("data-id");
        $.ajax(`/api/comment/`,{
            type: "POST",
            data: {
                id: id,
                user: "So and So",
                comment: "Blah blah blah",
                posted_on: new Date().getTime()
            }
        }).then((res)=>{

            console.log(res);
            let comment = newComment("So and So","Blah blah blah");
            $("#list-" + id).append(comment);
            $("#text-"+id).val("");

        })

    });

});