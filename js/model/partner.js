
function Partner(partnerJson) {

    this.id = partnerJson.id;
    this.name = partnerJson.name;
    this.address = partnerJson.address;
    this.zipCode = partnerJson.zipCode;
    this.city = partnerJson.city;
    this.email = partnerJson.email;
    this.phone = partnerJson.phone;
    this.webSite = partnerJson.webSite;
    this.partnerType = partnerJson.partnerType;
    this.contacts = [];
}


Partner.prototype = {

    constructor: Partner,

    setContacts: function(contacts) {
        this.contacts  = contacts;
    },


    toString: function(){
        return this.id + " " + this.name + " " + this.address + " " + this.contacts;
    }

}

module.exports = Partner;