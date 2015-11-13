// User:
// billyzac
//
// Token:
// var token = 'xoxp-2254406793-12729059815-14447487441-6f7925dadf'
var dataURI = 'https://slack.com/api/files.list?token=xoxp-2254406793-12729059815-14447487441-6f7925dadf&pretty=1'
// dataURI += '&' + token + '?jsoncallback=?'
var options = {}

function callback(data) {
  function drawList(fileTypeSelected) {
    // First remove all the previously drawn posts from the DOM
    $('.post').fadeOut(200, function() {
      $('this').remove()
    })

    for (var i=0; i<data.files.length; i++) {
      // Put the useful bits of data into nice names
      var title = data.files[i].title
      var fileType = data.files[i].pretty_type
      var thumbnail = data.files[i].thumb_360
      var fileURL = data.files[i].permalink_public

      // create div for new item
      var $post = $('<div class="post"></div>')
      if (fileType === 'JPEG' || fileType === 'PNG' || fileType === 'GIF') {
        $post.append('<img class="thumbnail" src="' + thumbnail + '" alt="' + title + '">')
      } else {
        $post.append('<div class="fake-thumbnail"></div>')
      }

      // append link, title, filetype, thumbnail
      var $link = $('<a class="link" href="' + fileURL + '">' + title + '</a>')
      // var $link = title
      $post.append($link)

      console.log(fileTypeSelected)
      if (fileTypeSelected === 'All') {
        $('.files').append($post);
      }
      if (fileTypeSelected === fileType) {
        $('.files').append($post);
      }
    }
  }
  drawList('All')

  // Watch selector, and redraw the list based on the filter
  $('select').on('input', function() {
    var $filetype = $(this).val()
    console.log('draw these:', $filetype)
    drawList($filetype)
  })
}

$.getJSON(dataURI, options, callback )
