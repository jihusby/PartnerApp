/**
 * Created by jam on 17/12/14.
 */
module.exports = {

    sortByKey: function(array, key) {
        return array.sort(function (a, b){
            var x = a[key], y = b[key];
            return ((x < y) ? -1 : ( (x > y) ? 1 : 0 ));
        });
    }

}
