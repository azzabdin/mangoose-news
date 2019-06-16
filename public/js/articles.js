$.getJSON("/articles", function (data) {
    data.forEach((article) => {

        $("#article").append(
            `<div class="article-container">
          <div class="artilcle-headline">
          <h3 "data-id="${article._id}"> ${article.headline}
          <button type="button" class="btn btn-save btn-success float-right" article-id="${article._id}">Save Article</button>
          </div>
          <div class="article-summary">
          <h5> ${article.summary} </h5>
          <a href="http://www.nytimes.com${article.link}" target="_blank">View Article</a>
          </div>
         </div>`
        )
    })
});

$(document).on("click", ".btn-save", function () {

    var articleId = $(this).attr("article-id")

    $.get(`/articles/${articleId}`)
        .then(function (dbarticle) {
            
          $(document).on("click", "#savenote", function() {
            
            var thisId = $(this).attr("data-id");
          
            $.ajax({
                method: "POST",
                url: "save",
                data: dbarticle
            })
                .then(function (data) {
                    
                });
            });
        });
    })