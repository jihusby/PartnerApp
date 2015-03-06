module.exports = {
    alert: function(title, message){
        if(navigator && navigator.notification){
            navigator.notification.alert(
                message,
                function () {
                },
                title,
                "OK"
            )
        } else{
            alert(message);   
        }
    }
}