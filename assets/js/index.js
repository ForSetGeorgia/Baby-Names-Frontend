var years, current_year;

// get the most recent year
make_ajax_call(generate_api_url('years'), {}, function(data){
  years = data;
  current_year = data.slice(-1)[0];
  $('h1').html(current_year + ' ' + $('h1').html());

  // get all most popular names
  make_ajax_call(generate_api_url('most_popular_for_year'), {year: current_year}, function(data){
    build_table('.most_popular_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);
  });

  // get boys most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'm'}, function(data){
    build_table('.most_popular_boys table', data,
      ['gender_rank', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);
  });

  // get girls most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'f'}, function(data){
    build_table('.most_popular_girls table', data,
      ['gender_rank', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);
  });


  // get largest increase
  make_ajax_call(generate_api_url('largest_amount_increase_for_year'), {year: current_year}, function(data){
    build_table('.largest_increase_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);
  });
  // get largest decrease
  make_ajax_call(generate_api_url('largest_amount_decrease_for_year'), {year: current_year}, function(data){
    build_table('.largest_decrease_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name?id=', 'param_key': 'id'}]);
  });


});

