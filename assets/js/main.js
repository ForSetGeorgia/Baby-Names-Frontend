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
  .fail(function( jqXHR, textStatus, error ) {
    console.log('AJAX FAIL: ' + textStatus);
    console.log(error);
  })
  .done(function( data ) {
    callback(data);
  });
}

function build_table(table_class, data, columns, links){
  $table = $(table_class);
  var tr, i, j, k, has_link;

  for(i=0;i<data.length;i++){
    tr = '<tr>';
    for(j=0;j<columns.length;j++){
      tr += '<td>';

      // see if link is needed
      has_link = false;
      if (links != null && links.length > 0){
        for(k=0;k<links.length;k++){
          if (links[k].column == columns[j]){
            tr += '<a href="' + links[k].url + data[i][links[k].param_key] + '">'

            has_link = true;
            break;
          }
        }
      }

      if (data[i][columns[j]] != null){
        tr += data[i][columns[j]];
      }

      if (has_link){
        tr += '</a>'
      }

      tr += '</td>';
    }
    tr += '</tr>';

    $table.find('tbody').append(tr);
  }
}

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
  var href = url ? url : window.location.href;
  var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
  var string = reg.exec(href);
  return string ? decodeURIComponent(string[1].replace('+', ' ')) : null;
};


function build_year_link(year){
  return '<a href="./?year=' + year + '">' + year + '</a>';
}

function sum_array_items(num, total){
  return num + total;
}

function get_years_for_value(array, key, value, as_link){
  as_link = typeof as_link !== 'undefined' ? as_link : false;

  var years = [];
  for(var i=0; i<array.length;i++){
    if (array[i][key] == value){
      if (as_link){
        years.push(build_year_link(array[i].year));
      }else{
        years.push(array[i].year);
      }
    }
  }

  return years;
}

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}