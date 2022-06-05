$('.open-modal').click(function(event){
    
    var dm = $(this).attr("data-modal");
    var modal = $(".modal[data-modal='"+ dm +"']");

    console.log(modal);


    modal.addClass('is-show');
    $('.overlay').addClass('is-show');
    //modal.visibility = visible;
})

$(".modal-cross").click(function(){
    $(this).parent(".modal").removeClass("is-show");
    $('.overlay').removeClass("is-show");
})

$('.overlay').click(function(){
    $(".modal.is-show").removeClass("is-show");
    $('.overlay').removeClass("is-show");
})
