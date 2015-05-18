var mongoose = require('mongoose');
Schema = mongoose.Schema;

var partnerModel = new Schema({
        id: {type: String},
        name: {type: String},
        address: {type: String},
        zipCode: {type: String},
        city: {type: String},
        email: {type: String},
        phone: {type: String},
        webSite: {type: String},
        partnerType: {type: String},
        logo: {type: String}
});

module.exports = mongoose.model('Partner', partnerModel);

