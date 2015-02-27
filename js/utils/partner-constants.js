
module.exports =  {
    Timeout: 20000,
    URLS: { 
        search: "http://api.sponsorweb.no/api/search",
        login: "http://api.sponsorweb.no/api/login",
        personImages: "http://godfoten.rbk.no/media/",
        partnerLogos: "http://godfoten.rbk.no/media/firmalogo/",
        active: "http://api.sponsorweb.no/api/persons/active"
    },
    MenuItems: {
        home: "home",
        search: "search",
        favorites: "favorites",
        partnerlist: "partnerlist",
        login: "login",
        partner_detail: "partner_detail",
        person_detail: "person_detail",
        contact_detail: "contact_detail",
        activities: "activities",
        activity: "activity"
    },
    LocalStorageKeys: { 
        activities: "activities",
        favorites: "favorites",
        partnerdata: "partnerdata",
        partnerTypes: "partnerTypes",
        persons: "persons",
        uid: "uid",
        bearer_token: "bearer_token",
        name: "name",
        last_refresh_date: "last_refresh_date",
        last_active_check: "last_active_check",
        contactNotes: "contactNotes"
    },
    SessionStorageKeys: {
        partnerFilter: "partnerFilter",
        activityFilter: "activityFilter"
    }
}
