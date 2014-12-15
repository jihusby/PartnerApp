/**
 *
 * Created by jam on 05/12/14.
 */
var Reflux = require("reflux");
var BackendActions = require("../actions/BackendActions");


var testData = '{ "partners": [ { "id": "1", "name": "Rema 1000", "address": "Gladengveien 2", "address2": "", "zipCode": "0661", "city": "Oslo", "email": "", "phone": "73891000", "website": "www.rema.no", "partnerType": "Hovedsamarbeidspartner" }, { "id": "2", "name": "Adidas Norge AS", "address": "Boks 104", "address2": "", "zipCode": "2000", "city": "Lillestrøm", "email": "", "phone": "63895800", "website": "www.adidas.no", "partnerType": "Samarbeidspartner" }, { "id": "391", "name": "Atea AS", "address": "Sluppenveien 12E", "address2": "", "zipCode": "7037", "city": "Trondheim", "email": "avtrondheim@fotophono.no", "phone": "73539500", "website": "www.atea.no", "partnerType": "Forretningspartner" } ], "persons": [ { "id": "559", "partnerId": "1", "firstName": "Ole Robert", "lastName": "Reitan", "position": "Adm.dir", "email": "ole.robert.reitan@rema.no", "mobile": "", "phone": "", "contactPerson": false, "partnerForum": false }, { "id": "516", "partnerId": "2", "firstName": "Torkel", "lastName": "Stensrud", "position": "Commercial manager", "email": "torkel.stensrud@adidas.com", "mobile": "90144613", "phone": "", "contactPerson": false, "partnerForum": false }, { "id": "517", "partnerId": "2", "firstName": "Thomas", "lastName": "Mietinen", "position": "", "email": "Thomas.Mietinen@adidas.com", "mobile": "90919950", "phone": "", "contactPerson": true, "partnerForum": false } ] }';

module.exports = Reflux.createStore({

    listenables: [BackendActions],

    onSynchronizePartners: function() {
       console.log("Synchronize partners called from React Component")
    },

    getInitialState: function () {
        return testData;
    }
});
