// User:
// billyzac
//
console.log('Set the token in Local Storage:')
console.log('localStorage.setItem("token", [put your token here])')
console.log('Then reload the page.')

// Token:
var token = localStorage.getItem("token")
var dataURI = 'https://slack.com/api/files.list?' +
'token=' + token +
'&pretty=1'
// dataURI += '&' + token + '?jsoncallback=?'
var options = {}
$spinner = $('<div class="spinner"><img src="http://histpics.msa.maryland.gov/images/loading.gif" alt="loading spinner" /></div>')
$('main').append($spinner)
function callback(data) {
  // Remove the spinner
  $('.spinner').remove()
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
