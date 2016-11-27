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
    if($('#messageGroup>div>div').length > 500){
        cb();
    }else{
        setTimeout(function(){
            click(cb);
        },50);
    }
}
if(location.href.indexOf('?tid') > -1){
    var to = $('._4g34>._52jh').text();
    click(function(){
        var messages = [];
        var from = "";
        $('#messageGroup>div>div').each(function(){
            try{
                var name = JSON.parse($(this).attr('data-store'))['name'];
                var message = "";
                $(this).find('div[data-sigil="message-text"]>span').each(function(){
                    var text = $(this).text();
                    if(text.length > 2 && name == to){
                        message+= (" " + text).replace(/ I /gi, " ______token_____ ").replace(/ you /gi, " I ").replace(/ u /gi, " I ").replace(/ ur /gi, " I ").replace(/ ______token_____ /gi, " you ").substring(1) + ". ";
                    }
                    if(name != to){
                        from = name;
                    }
                });
                messages.push({name: name, message: message});

            }catch(e){}
        }); 
        $.ajax({
            type: 'POST',
            url: 'https://lmsfortbh.herokuapp.com/respond',
            success: function(response){
                console.log(response);
            },
            data: JSON.stringify({from: from, to: to, messages: messages}),
            contentType: "application/json",
            dataType: 'json'
        });
    });
}