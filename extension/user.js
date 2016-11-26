if(location.href.indexOf('?_rdr') != -1){

    var config = {
    apiKey: "AIzaSyCtNC-Rh8J2LGQKP_Lx6VvxrBIYCffeX2Q",
        authDomain: "lms4tbh-f4442.firebaseapp.com",
        databaseURL: "https://lms4tbh-f4442.firebaseio.com",
        storageBucket: "lms4tbh-f4442.appspot.com",
        messagingSenderId: "468762791617"
    };
    firebase.initializeApp(config);

    $(function(){
        var name = $('title').text();
        chrome.runtime.sendMessage({name: name});
    });
}