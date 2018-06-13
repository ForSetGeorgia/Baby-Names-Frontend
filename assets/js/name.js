// get the name_id from the url querystring
var name_id = getQueryString('id');

// get the name details
make_ajax_call(generate_api_url('name'), {id: name_id}, function(data){
  // update title
  $('title').html(data[0].name + ' | ' + $('title').html());

  // update h1
  $('h1').html(data[0].name);

  // update h2
  $('h2').html($('h2').html() + data[0].gender);

  // build table
  build_table('.name_details table', data, ['year', 'gender_rank', 'overall_rank', 'amount', 'amount_year_change']);
});
