module.exports = {
    alert: function(title, message){
        if(navigator && navigator.notification){
            navigator.notification.alert(
                message,
                alertDismissed,
                title,
                "Skjul"
            );
        } else{
            alert(message);   
        }
    },
    
    alertDismissed: function(){
       
    }
}