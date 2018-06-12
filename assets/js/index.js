var most_popular, most_popular_boys, most_popular_girls;

// get all most popular names
make_ajax_call(generate_api_url('most_popular_for_year'), {year: 2017}, function(data){
  most_popular = data;
  build_table('.most_popular_overall table', data, ['gender', 'name', 'amount', 'amount_year_change']);
});

// get boys most popular names
make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: 2017, gender: 'm'}, function(data){
  most_popular_boys = data;
  build_table('.most_popular_boys table', data, ['name', 'amount', 'amount_year_change']);
});

// get girls most popular names
make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: 2017, gender: 'f'}, function(data){
  most_popular_girls = data;
  build_table('.most_popular_girls table', data, ['name', 'amount', 'amount_year_change']);
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