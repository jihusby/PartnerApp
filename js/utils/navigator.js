var historyStack = [];
module.exports = {
    
    goTo: function(route){
        console.log("Went to: " + route);
        historyStack.push(route);
        
        routie(route);
    }
}

window.onpopstate = function(e) { 
    //console.log("popping");
    //var lastEntry = historyStack.pop();
    //history.replaceState({}, lastEntry, "#" + lastEntry);
}