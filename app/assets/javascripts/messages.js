$(function(){
	function buildHTML(message){
		var image = ""
		// 画像があれば変数imageにimgタグを挿入
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



// <div class="message">
// <div class="top-message">
// <div class="top-message__user-name">
// aaa
// </div>
// <div class="top-message__time">
// 2019/01/20 03:38
// </div>
// </div>
// <div class="bottom-message">
// <p class="bottom-message__body">
// test
// </p>
// <img class="lower-message__image" src="/uploads/message/image/71/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2018-11-02_19.25.13.png" alt="%e3%82%b9%e3%82%af%e3%83%aa%e3%83%bc%e3%83%b3%e3%82%b7%e3%83%a7%e3%83%83%e3%83%88 2018 11 02 19.25.13">
// </div>
// </div>


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