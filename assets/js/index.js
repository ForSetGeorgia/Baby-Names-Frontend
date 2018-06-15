var years, current_year;

// get the most recent year
make_ajax_call(generate_api_url('years'), {}, function(data){
  years = data;

  current_year = getQueryString('year');
  if(current_year == null){
    current_year = data.slice(-1)[0];
  }else{
    current_year = Number(current_year);
  }

  $('h1').html($('h1').html() + ': ' + current_year);

  // get all most popular names
  make_ajax_call(generate_api_url('most_popular_for_year'), {year: current_year}, function(data){
    build_table('.most_popular_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);
  });

  // get boys most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'b'}, function(data){
    build_table('.most_popular_boys table', data,
      ['gender_rank', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);
  });

  // get girls most popular names
  make_ajax_call(generate_api_url('most_popular_for_year_and_gender'), {year: current_year, gender: 'g'}, function(data){
    build_table('.most_popular_girls table', data,
      ['gender_rank', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);
  });


  // get largest increase
  make_ajax_call(generate_api_url('largest_amount_increase_for_year'), {year: current_year}, function(data){
    build_table('.largest_increase_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);
  });
  // get largest decrease
  make_ajax_call(generate_api_url('largest_amount_decrease_for_year'), {year: current_year}, function(data){
    build_table('.largest_decrease_overall table', data,
      ['overall_rank', 'gender', 'name', 'amount', 'amount_year_change'],
      [{'column': 'name', 'url': './name.html?id=', 'param_key': 'id'}]);
  });


  // get year summaries
  make_ajax_call(generate_api_url('years_amount_summary'), {}, function(data){
    // format data for charts
    var total_amounts = data.reverse().map(function(item){
      return item.total_births;
    });
    var total_boy_amounts = data.reverse().map(function(item){
      return item.total_boy_births;
    });
    var total_girl_amounts = data.reverse().map(function(item){
      return item.total_girl_births;
    });

    // highlight the current year
    console.log(years.reverse());
    console.log(typeof current_year === 'string');
    idx_year = years.reverse().indexOf(current_year);
    console.log(idx_year);
    if (idx_year > -1){
      total_amounts[idx_year] = { marker: {
                      fillColor: '#FF0000',
                      lineWidth: 3,
                      lineColor: "#FF0000" // inherit from series
              },y:total_amounts[idx_year]};

      total_boy_amounts[idx_year] = { marker: {
                      fillColor: '#FF0000',
                      lineWidth: 3,
                      lineColor: "#FF0000" // inherit from series
              },y:total_boy_amounts[idx_year]};

      total_girl_amounts[idx_year] = { marker: {
                      fillColor: '#FF0000',
                      lineWidth: 3,
                      lineColor: "#FF0000" // inherit from series
              },y:total_girl_amounts[idx_year]};

    }

    // chart
    Highcharts.chart('births-over-time', {

      title: {
        text: 'Births Over Time'
      },

      yAxis: {
        title: {
          text: 'Number of Births'
        },
        min: 0
      },

      legend: {
        enabled: true
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: years[0]
        }
      },

      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
        shared: true,
        crosshairs: true
      },

      // tooltip: {
      //   formatter: function() {
      //     return '<b>' + this.point.name + '</b><br/>' +
      //             'Amount: ' + this.y + '<br />' +
      //             'Amount Change: ' + this.point.amount_change + '<br />' +
      //             'Gender Rank: ' + this.point.gender_rank + '<br />' +
      //             'Overall Rank: ' + this.point.overall_rank;
      //   }
      // },

      series: [{
        name: 'Total Births',
        data: total_amounts
      },
      {
        name: 'Girl Births',
        data: total_girl_amounts
      },
      {
        name: 'Boy Births',
        data: total_boy_amounts
      }
      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });


  });

});

