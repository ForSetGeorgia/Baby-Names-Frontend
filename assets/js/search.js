// get the search from the url querystring
var q = getQueryString('q');

$('form input#q').attr('value', q);

// get the name details
make_ajax_call(generate_api_url('search'), {q: q}, function(data){
  // update title
  $('title').html('Search Results for: ' + q + ' | ' + $('title').html());

  // update h1
  $('h1').html($('h1').html().replace('{count}', data.length).replace('{q}', q));

  // load table
  build_table('.name_details table', data,
    ['name', 'gender', 'overall_rank', 'amount', 'amount_year_change'],
    [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);

});
