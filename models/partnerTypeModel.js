var mongoose = require('mongoose');
Schema = mongoose.Schema;

var partnerTypeModel = new Schema({
        id: {type: String},
        name: {type: String}
});

module.exports = mongoose.model('PartnerType', partnerTypeModel);

