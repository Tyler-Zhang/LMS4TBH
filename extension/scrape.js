function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function click(cb){
    var el = $('#messageGroup a:first');
    if(el.hasClass('primary')) eventFire($('#messageGroup a:first')[0], 'click');
    else{
        cb();
        return;
    }
    if($('#messageGroup>div>div').length > 100){
        cb();
    }else{
        setTimeout(function(){
            click(cb);
        },50);
    }
}
if(location.href.indexOf('?tid') > -1){
    click(function(){
        var messages = [];
        $('#messageGroup>div>div').each(function(){
            try{
                var name = JSON.parse($(this).attr('data-store'))['name'];
                var message = $(this).find('div[data-sigil="message-text"]>span').text();
                messages.push({name: name, message: message});

            }catch(e){}
        }); 
        $.post('https://lmsfortbh.herokuapp.com/respond', {messages: messages}, function(response){
            alert(response);
        });
    });
}