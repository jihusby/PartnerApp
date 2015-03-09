module.exports = {
    set: function(key, value){
        window.sessionStorage.setItem(key, value);   
    },
    
    get: function(key){
        return window.sessionStorage.getItem(key);
    },
    
    remove: function(key){
        window.sessionStorage.removeItem(key);
    }
}