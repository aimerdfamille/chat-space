$(function(){
	function buildHTML(message){
		var image = ""
		if (message.image.url != null) {
			image = `<img class="hidden" src=${message.image.url}`
		}
    var html = `<div class="message">
    							<div class="top-message">
							    	<div class="top-message__user-name">
										${message.user_name}
										</div>
										<div class="top-message__time">
										${message.time}
										</div>
									</div>
									<div class="bottom-message">
										<p class="bottom-message__body">
										${message.text}
										</p>
										${ image }
									</div>
								</div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.form__submit').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
	  })
	  .done(function(data){
	      var html = buildHTML(data);
	      $('.messages').append(html);
    		$('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'
    		);
	      $('.form__chat__message').val('');
	      $('.hidden').val('');
	  })
	  .fail(function(){
      alert('error');
    })

  })
})