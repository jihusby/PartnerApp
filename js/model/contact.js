
function Contact(json) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phone = json.phone;
    this.mobile = json.mobile;
    this.position = json.position;
    this.partner = {};
}

Contact.prototype = {

    constructor: Contact,

    setPartner: function(partner) {
        this.partner = partner;
    },

    toString: function(){
        return this.id + " " + this.firstName + " " + this.lastName + " " + this.position;
    }
}

module.exports = Contact;