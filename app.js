// User:
// billyzac
//
// Token:
// var token = 'xoxp-2254406793-12729059815-14447487441-6f7925dadf'
var dataURI = 'https://slack.com/api/files.list?token=xoxp-2254406793-12729059815-14447487441-6f7925dadf&pretty=1'
// dataURI += '&' + token + '?jsoncallback=?'
var options = {}

var tempGlobalForTesting

function callback(data) {
  for (var i=0; i<data.files.length; i++) {
    tempGlobalForTesting = data
    // data.files[i].name
    var title = data.files[i].title
    var fileType = data.files[i].pretty_type
    // data.files[i].created
    var thumbnail = data.files[i].thumb_360
    var fileURL = data.files[i].permalink_public
    // var name = data.files[i].name

    // create div for new item
    var $post = $('<div class="post"></div>')
    if (fileType === 'JPEG' || fileType === 'PNG' || fileType === 'GIF') {
      $post.append('<img class="thumbnail" src="' + thumbnail + '" alt="' + title + '">')
    } else {
      $post.append('<div class="fake-thumbnail"></div>')
    }

    // append link, title, filetype, thumbnail
    var $link = $('<a href="' + fileURL + '">' + title + '</a>')
    // var $link = title
    $post.append($link)


    $('.files').append($post);
  }
}

$.getJSON(dataURI, options, callback )

function getFileTypeSelection() {
  return $('select').val()
}

// Watch selector, (and filter the list?)
$('select').on('input', function() {
  var $filetype = $(this).val()
  console.log($filetype)
})
