var moment = require("moment");
module.exports = {

    formatDates: function(startDate, endDate){
        var date = "";
        var fullDateFormat = "DD.MM YYYY HH.mm";
        var timeFormat = "HH.mm"
        if(startDate){
            var startDay = moment(startDate).dayOfYear();
            date = moment(startDate).format(fullDateFormat);
            if(endDate){
                var endDay = moment(endDate).dayOfYear();
                var format = startDay - endDay === 0 ? timeFormat : fullDateFormat;
                date = date + " - " + moment(endDate).format(format);
            }
        }
        return date;
    },
    
    sortByKey: function(array, key) {
        return array.sort(function (a, b){
            var x = a[key], y = b[key];
            return ((x < y) ? -1 : ( (x > y) ? 1 : 0 ));
        });
    },

    lookupPartner: function(partnerArray, id) {
        for(partner in partnerArray) {
            if(partnerArray[partner].id == id) {
                return partnerArray[partner];
            }
        }
        return undefined;
    }

}
