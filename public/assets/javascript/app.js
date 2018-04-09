$(document).ready(()=>{
    $(".show").on("click",function(){
        let id = $(this).attr("data-id");
        console.log(id);
        if( $("#comments-" + id).hasClass("hidden") )
            $("#comments-" + id).removeClass("hidden");
        else
            $("#comments-" + id).addClass("hidden");
    });
    $(".panel-heading").on("click",function(){
        window.open($(this).attr("data-link"));
    });
});