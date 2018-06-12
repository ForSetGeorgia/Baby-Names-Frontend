var years, current_year;

// get the most recent year
make_ajax_call(generate_api_url('years'), {}, function(data){
  years = data;
  current_year = data.slice(-1)[0];
  $('h1').html(current_year + ' ' + $('h1').html());

  // get all most popular names
  make_ajax_call(generate_api_url('most_popular_for_year'), {year: current_year}, function(data){
    build_table('.most_popular_overall table', data, ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change']);
  });

  // get boys most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'm'}, function(data){
    build_table('.most_popular_boys table', data, ['gender_rank', 'name', 'amount', 'amount_year_change']);
  });

  // get girls most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'f'}, function(data){
    build_table('.most_popular_girls table', data, ['gender_rank', 'name', 'amount', 'amount_year_change']);
  });

});



function build_table(table_class, data, columns){
  $table = $(table_class);
  var tr, i, j;

  for(i=0;i<data.length;i++){
    tr = '<tr>';
    for(j=0;j<columns.length;j++){
      tr += '<td>';
      tr += data[i][columns[j]];
      tr += '</td>';
    }
    tr += '</tr>';

    $table.find('tbody').append(tr);
  }
}