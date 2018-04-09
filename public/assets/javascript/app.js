$(document).ready(()=>{
    $(".btn-comix").on("click",function(){
        console.log($(this).attr("id"));
    });
    $(".panel-heading").on("click",function(){
        window.open($(this).attr("data-link"));
    });
});