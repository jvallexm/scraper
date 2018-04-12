$(document).ready(()=>{

    /* Function to create new comment blocks when they have been posted */

    function newComment(user,comment){

        let panel   = $("<div>").addClass("panel panel-comment");
        let heading = $("<div>").addClass("panel-heading comment-head").text(`${user} Says...`);
        let body    = $("<div>").addClass("panel-body comment-body").text(comment);

        panel.append(heading).append(body);

        return panel;

    }

    /* Shows and hides comment threads on posts */

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

    /* Opens a window to the link of the headline */

    $(".panel-heading").on("click",function(){

        window.open($(this).attr("data-link"));

    });

    /* Form submit function */

    $("form").on("submit",function(e){

        e.preventDefault();

        let id = $(this).attr("data-id"); // Gets the id of the post that's being commented on

        let newComment = $("#text-" + id).val().trim(); // Gets the text of the new comment

        /* Simple validation */

        if(newComment.length > 150) {

            $("#error-" + id).text("Please limit comments to 150 characters");

        } else if (newComment.length < 10) {

            $("#error-" + id).text("Comments must be at least 10 characters");

        } else {

            $("#error-" + id).text("");
        
            $.ajax(`/api/comment/`,{
                type: "POST",
                data: {
                    id: id,
                    comment: {
                        user_id: "4",
                        user: "So and So",
                        comment: $("#text-" + id).val().trim(),
                        posted_on: new Date().getTime()
                    }
                }
            }).then((res)=>{

                /* Once a comment has been posted it appends it to that article on the user's side */

                console.log(res);
                let comment = newComment("So and So","Blah blah blah");
                $("#list-" + id).append(comment);
                $("#text-"+id).val("");

            })
        
        }

    });

});