
function Contact(json) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.position = json.position;
    this.partnerId = json.partnerId;
}

Contact.prototype = {

    constructor: Contact,

    toString: function(){
        return this.id + " " + this.firstName + " " + this.lastName + " " + this.position;
    }
}

module.exports = Contact;