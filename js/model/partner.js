
function Partner(partnerJson) {

    this.id = partnerJson.Id;
    this.name = partnerJson.Name;
    this.address = partnerJson.Address;
    this.zipCode = partnerJson.ZipCode;
    this.city = partnerJson.City;
    this.email = partnerJson.Email;
    this.phone = partnerJson.Phone;
    this.webSite = partnerJson.WebSite;
    this.partnerType = partnerJson.PartnerType;
    this.contacts = [];
}


Partner.prototype = {

    constructor: Partner,

    setContacts: function(contacts) {
        this.contacts  = contacts;
        var partner = this;
        this.contacts.forEach(function(contact){
           contact.setPartner(partner)
        });
    },


    toString: function(){
        return this.id + " " + this.name + " " + this.address + " " + this.contacts;
    }

}

module.exports = Partner;


