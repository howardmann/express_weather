$(document).ready(function(){
  console.log('ready');

  var $input = $('input[type="text"]');
  var $form = $('form');
  var $main = $('#main');

  $form.on('submit', function(e){
    e.preventDefault();
    var zipcode = $input.val();
    $main.html('now loading...');
    $input.val('');
    $.ajax({
      url: `/${zipcode}`,
      dataType: 'json'
    }).done(function(data){
      $main.html(`${data.city} is currently ${data.summary} with temperature of ${data.temperature}`);
    }).fail(function(){
      $main.html('Error!');
    });
  });

});
