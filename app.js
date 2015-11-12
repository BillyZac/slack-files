// User:
// billyzac
//
// Token:
var token = 'xoxp-2254406793-12729059815-14447487441-6f7925dadf'
var dataURI = 'https://slack.com/api/files.list?token=xoxp-2254406793-12729059815-14447487441-6f7925dadf&pretty=1'
// dataURI += '&' + token + '?jsoncallback=?'
var options = {}

var tempGlobalForTesting

function callback(data) {
  for (var i=0; i<data.files.length; i++) {
    console.log(data.files[i].permalink_public)
    var fileURL = data.files[i].permalink_public
    var name = data.files[i].name
    var newItem = $('<li><a href="' + fileURL + '"</a>' + name + '</li>')
    $('.files').append(newItem)
  }
}

$.getJSON(dataURI, options, callback )
