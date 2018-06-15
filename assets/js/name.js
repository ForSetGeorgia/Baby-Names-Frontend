// get the name_id from the url querystring
var name_id = getQueryString('id');

// get the name details
make_ajax_call(generate_api_url('name'), {id: name_id}, function(data){
  // update title
  $('title').html(data[0].name + ' | ' + $('title').html());

  // update h1
  $('h1').html(data[0].name);

  // update h2
  $('h2.gender').html($('h2.gender').html() + data[0].gender);

  // build table
  build_table('.name_details table', data,
    ['year', 'gender_rank', 'overall_rank', 'amount', 'amount_year_change'],
    [{'column': 'year', 'url': './?year=', 'param_key': 'year'}]);

  // add quick stats
  var amounts = data.map(function(item){
    return item.amount;
  });
  var ranks = data.map(function(item){
    return item.gender_rank;
  });
  var changes = data.map(function(item){
    return item.amount_year_change;
  });

  // - total amount
  $('.quick_stats table tr.total td:eq(1)').html(numberWithCommas(amounts.reduce(sum_array_items, 0)));
  $('.quick_stats table tr.total td:eq(2)').html(data[data.length-1].year + ' to ' + data[0].year);

  // - max amount
  var num = Math.max.apply(Math, amounts);
  var years = get_years_for_value(data, 'amount', num, true);
  $('.quick_stats table tr.max-amount td:eq(1)').html(num);
  $('.quick_stats table tr.max-amount td:eq(2)').html(years.join(', '));

  // - min amount
  num = Math.min.apply(Math, amounts);
  years = get_years_for_value(data, 'amount', num, true);
  $('.quick_stats table tr.min-amount td:eq(1)').html(num);
  $('.quick_stats table tr.min-amount td:eq(2)').html(years.join(', '));

  // - max rank
  num = Math.min.apply(Math, ranks);
  years = get_years_for_value(data, 'gender_rank', num, true);
  $('.quick_stats table tr.max-rank td:eq(1)').html(num);
  $('.quick_stats table tr.max-rank td:eq(2)').html(years.join(', '));

  // - min rank
  num = Math.max.apply(Math, ranks);
  years = get_years_for_value(data, 'gender_rank', num, true);
  $('.quick_stats table tr.min-rank td:eq(1)').html(num);
  $('.quick_stats table tr.min-rank td:eq(2)').html(years.join(', '));

  // - max increase
  num = Math.max.apply(Math, changes);
  years = get_years_for_value(data, 'amount_year_change', num, true);
  $('.quick_stats table tr.max-increase td:eq(1)').html(num);
  $('.quick_stats table tr.max-increase td:eq(2)').html(years.join(', '));

  // - max decrease
  num = Math.min.apply(Math, changes);
  years = get_years_for_value(data, 'amount_year_change', num, true);
  $('.quick_stats table tr.max-decrease td:eq(1)').html(num);
  $('.quick_stats table tr.max-decrease td:eq(2)').html(years.join(', '));
});
