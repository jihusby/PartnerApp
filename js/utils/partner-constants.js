
module.exports =  {
    URLS: { 
        search: "http://godfotenrestapi.azurewebsites.net/api/search",
        login: "http://godfotenrestapi.azurewebsites.net/api/login",
    },
    MenuItems: {
        home: "home", 
        favorites: "favorites",
        partnerlist: "partnerlist",
        login: "login"
    },
    LocalStorageKeys: { 
        favorites: "favorites" ,
        partnerdata: "partnerdata"
    },
    SessionStorageKeys: {
        uid: "uid",
        bearer_token: "bearer_token",
        name: "name"
    }
}
