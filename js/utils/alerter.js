module.exports = {
    alert: function(title, message){
        if(navigator && navigator.notification){
            navigator.notification.alert(
                message,
                this.alertDismissed,
                title,
                "Skjul"
            );
        } else{
            alert("Alert: " + message);   
        }
    },
    
    alertDismissed: function(){
       
    }
}