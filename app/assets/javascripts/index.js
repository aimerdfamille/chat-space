$(function() {
	function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                </div>`
    return html;
  }

  function removeUser(name,id){
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return  html;
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    if(input.length > 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        users.forEach(function(user){
          var html = appendUser(user);
          $('#user-search-result').append(html);
        });
     	})
      .fail(function(){
        alert('ユーザーの検索に失敗しました');
      })
    }
    else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
      })
    }
  });

  $('#user-search-result').on('click','.chat-group-user__btn--add', function() {
    var id = $(this).data('user-id');
    var name  = $(this).data('user-name');
    var html = removeUser(name,id);
    $('#chat-group-users').append(html)
    $(this).parent().empty()
  });

  $('#chat-group-users').on('click','.js-remove-btn', function() {
    $(this).parent().empty()
  });

});