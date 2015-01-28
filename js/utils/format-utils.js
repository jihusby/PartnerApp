var React = require("react");

module.exports = {

    formatMobile: function(mobile) {
        if(mobile && mobile.length>0){
            mobile = mobile.replace(/\s+/g, '');
            return mobile.substring(0,3) + ' ' + mobile.substring(3,5) + ' ' + mobile.substring(5,8);
        }else{
            return ("");
        }
    },

    formatPhone: function(phone) {
        if(phone && phone.length>0){
            phone = phone.replace(/\s+/g, '');
            return phone.substring(0,2) + ' ' + phone.substring(2,4) + ' ' + phone.substring(4,6) + ' ' + phone.substring(6,8);
        }else{
            return ("");
        }
    }
}