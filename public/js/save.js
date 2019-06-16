
$.getJSON("/saves", function (data) {
    data.forEach((article) => {
        console.log('saved article', article)
        $("#saved-article").append(
            `<div class="article-container">
       <div class="artilcle-headline">
       <h3 data-id="${article._id}"> ${article.headline}
       <button type="button" class="btn btn-delete btn-danger float-right" article-id="${article._id}">Delete Article</button>
       <button type="button" class="btn btn-note btn-warning float-right" article-id="${article._id}" data-toggle="modal" data-target="#exampleModal" data-whatever="note">Article Notes</button>
       </div>
       <div class="article-summary">
       <h5> ${article.summary} </h5>
       <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>
       </div>
       </div>`

        )
    });
});
$(document).ready(function () {

    $(".nav-link-scrape").hide();
    $(document).on("click", ".btn-delete", function () {


        var articleId = $(this).attr("article-id")
        $.get(`/delet/${articleId}`)
            .then(function (article) {
            });
    });
    $(document).on("click", ".btn-note", function (event) {
        var articleId = $(this).attr("article-id")
        $.get(`save/${articleId}`)
            .then(function (article) {
            
                var button = $(event.relatedTarget)
                var recipient = button.data('whatever')
                var modal = $(this)
                modal.find('.modal-title').text('New message to ' + recipient)
                modal.find('.modal-body input').val(recipient)
                $(document).on("click", ".btn-submit", function (event) {
                    var noteInput = $("#message-text").val().trim();
                    $.ajax({
                        method: "POST",
                        url: `/save/${articleId}`,
                        data: {
                            body: $("#message-text").val().trim()
                        }
                    })
                        .then(function (data) {
                            $("#message-text").empty();
                        })
                });


            });
    });


});
