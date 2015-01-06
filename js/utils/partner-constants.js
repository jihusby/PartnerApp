
module.exports =  {
    URLS: { 
        search: "http://godfotenrestapi.azurewebsites.net/api/search",
        login: "http://localhost:49620/api/login",
    },
    MenuItems: {
        home: "home", 
        favorites: "favorites",
        partnerlist: "partnerlist"
    },
    LocalStorageKeys: { 
        favorites: "favorites" 
    },
    SessionStorageKeys: {
        uid: "uid",
        bearer_token: "bearer_token",
        name: "name"
    }
}
