// get the search from the url querystring
var q = getQueryString('q');
var page = getQueryString('page');
if (page == null || page == ''){
  page = 1;
}

$('form input#q').attr('value', q);

// get the name details
make_ajax_call(generate_api_url('search'), {q: q, page: page}, function(data){
  var meta = data.meta;
  data = data.years;

  // update title
  $('title').html('Search Results for: ' + q + ' | ' + $('title').html());

  // update h1
  $('h1').html($('h1').html().replace('{count}', meta.total_count).replace('{q}', q));

  // load table
  build_table('.name_details table', data,
    ['name', 'gender', 'overall_rank', 'amount', 'amount_year_change'],
    [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);

  // update pagination links
  var params = 'q=' + q;
  // first
  if (meta.current_page == 1){
    $('.pagination a:eq(0)').bind('click', false).removeAttr("href").addClass('disabled');
  }else{
    $('.pagination a:eq(0)').attr('href', $('.pagination a:eq(0)').attr('href') + params + '&page=1');
  }
  // prev
  if (meta.prev_page == null){
    $('.pagination a:eq(1)').bind('click', false).removeAttr("href").addClass('disabled');
  }else{
    $('.pagination a:eq(1)').attr('href', $('.pagination a:eq(1)').attr('href') + params + '&page=' + meta.prev_page);
  }

  // next
  if (meta.next_page == null){
    $('.pagination a:eq(2)').bind('click', false).removeAttr("href").addClass('disabled');
  }else{
    $('.pagination a:eq(2)').attr('href', $('.pagination a:eq(2)').attr('href') + params + '&page=' + meta.next_page);
  }

  // last
  if (meta.current_page == meta.total_pages){
    $('.pagination a:eq(3)').bind('click', false).removeAttr("href").addClass('disabled');
  }else{
    $('.pagination a:eq(3)').attr('href', $('.pagination a:eq(3)').attr('href') + params + '&page=' + meta.total_pages);
  }
});
