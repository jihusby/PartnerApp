var mongoose = require('mongoose');
Schema = mongoose.Schema;

var personModel = new Schema({
        id: {type: String},
        partnerId: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        position: {type: String},
        email: {type: String},
        password: {type: String},
        token: {type: String},
        mobile: {type: String},
        contactPerson: {type: Boolean},
        partnerForum: {type: Boolean},
        picture: {type: String},
        active: {type: Boolean}
});

module.exports = mongoose.model('Person', personModel);

