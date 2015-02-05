
function Activity(json) {
    this.id = json.id;
    this.title = json.title;
    this.titleShort = json.titleShort;
    this.location = json.location;
    this.description = json.description;
    this.startDate = json.startDate;
    this.endDate = json.endDate;
    this.employeeId = json.employeeId;
    this.deadlineDate = json.deadlineDate;
    this.enrollments = json.enrollments;
}

Activity.prototype = {

    constructor: Activity
}

module.exports = Activity;