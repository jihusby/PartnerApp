var mongoose = require('mongoose');
Schema = mongoose.Schema;

var activityModel = new Schema({
        id: {type: String},
        title: {type: String},
        titleShort: {type: String},
        location: {type: String},
        description: {type: String},
        startDate: {type: String},
        endDate: {type: String},
        employeeId: {type: String},
        deadlineDate: {type: String},
        enrollments: {type: String}
});

module.exports = mongoose.model('Activity', activityModel);
