
function Contact(json) {
    this.id = json.Id;
    this.firstName = json.FirstName;
    this.lastName = json.LastName;
    this.position = json.Position;
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