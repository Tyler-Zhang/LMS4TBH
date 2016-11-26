if(location.href.indexOf('?q=') > -1){
    $('#threadlist_rows > div > div').each(function(){
       if($(this).attr('id').indexOf('fbid_thread') == -1){
           document.location = $(this).find('a').attr('href');
       } 
    });
}
