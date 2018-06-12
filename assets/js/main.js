///////////////////////
// set global variables
///////////////////////
var current_locale = document.documentElement.lang;
var api_origin = 'http://localhost:3000/';
var api_url = api_origin + current_locale + '/v1/';


function generate_api_url(action){
  return api_url + action
}

function make_ajax_call(url, data, callback){
  $.ajax({
    url: url,
    dataType: 'jsonp',
    data: data,
    method: 'GET',
    beforeSend: function( xhr ) {
      xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    }
  })
  .done(function( data ) {
    callback(data);
  });
}