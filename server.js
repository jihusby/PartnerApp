var express = require('express'),
    mongoose = require('mongoose');

var bodyParser = require("body-parser");

var Partner = require('./models/partnerModel');
var PartnerType = require('./models/partnerTypeModel');
var Person = require('./models/personModel');
var Activity = require('./models/activityModel');

var TestScript = require('./server/js/testScript');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;

var partnerData = {
    partners: [],
    persons: [],
    partnerTypes: [],
    activities: []
};

prepareTestData();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Authorize");
    next();
});

var partnerRouter = express.Router();

partnerRouter.route('/search')
    .get(function(req,res){
        console.log("Getting data...");

        Partner.find(function(err,data){
            if(err){
                console.log("Error: " + err);
            }else{
                partnerData.partners = data;
            }
        });
        Person.find(function(err,data){
            if(err){
                console.log("Error: " + err);
            }else{
                partnerData.persons = data;
            }
        });
        PartnerType.find(function(err,data){
            if(err){
                console.log("Error: " + err);
            }else{
                partnerData.partnerTypes = data;
            }
        });
        Activity.find(function(err,data){
            if(err){
                console.log("Error: " + err);
            }else{
                partnerData.activities = data;
            }
        });
        res.json(partnerData);
    });

partnerRouter.route('/persons/active')
    .get(function(req,res){
        console.log("Sending true");
        var activeData = {
            active: true
        };
        res.json(activeData);
        /* TODO: Fix check active function
        var token = req.body.token;
        Person.collection.find({token: token, active: true}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res(err);
            } else if (result.length) {

                var person = result[0];
                credentials = {
                    token: person.token,
                    userId: person.id,
                    name: person.firstName + " " + person.lastName
                };
                res.send(true);

            } else {
                res.send(false);
            }
        });
        */
    });

partnerRouter.route('/login')
    .post(function(req,res){

        var email = req.body.Email;
        var password = req.body.Password;

        Person.collection.find({email: email, password: password}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res(err);
            } else if (result.length) {

                var person = result[0];
                credentials = {
                    token: person.token,
                    userId: person.id,
                    name: person.firstName + " " + person.lastName
                };
                res.json(credentials);

            } else {
                res.send("Error");
            }
        });
    });

app.use('/api', partnerRouter);


app.get('/', function(req, res) {
    console.log("Blank");
    res.send('Welcome to the API');
});

app.listen(port, function() {
    console.log("Express server listening on port " + port);
});

function prepareTestData() {

    removeTestData();

    insertPartner("1", "Itema as", "Granåsveien 3", "hei@itema.no", "12345678");
    insertPartner("2", "Adresseavisen", "Heimdal 1", "firmapost@adressa.no", "12345678");
    insertPartner("3", "Firmaet mitt", "Heimdal 2", "firmapost@firmaetmitt.no", "12345678");
    insertPartnerType();
    insertPerson();
    insertActivity();
}

function removeTestData() {
    Partner.remove({}, function(err) {
        console.log('TestScript: partners removed')
    });
    Person.remove({}, function(err) {
        console.log('TestScript: persons removed')
    });
    PartnerType.remove({}, function(err) {
        console.log('TestScript: partnertypes removed')
    });
    Activity.remove({}, function(err) {
        console.log('TestScript: activities removed')
    });

}

function insertPartner(id, name, address, email, phone) {
    var partner = new Partner({
        id: id,
        name: name,
        address: address,
        zipCode: '7048',
        city: 'Trondheim',
        email: email,
        phone: phone,
        webSite: 'www.itema.no',
        partnerType: 'Nettverkspartner',
        logo: 'logo.jpg'
    });
    partner.save(function(err, partner) {
        if(err) return console.error(err);
    });
    console.log('TestScript: partners added');
}

function insertPerson() {
    var person = new Person({
        id: "1",
        firstName: "Jan Inge",
        lastName: "Husby",
        email: "jih@itema.no",
        password: "letmein",
        token: "1287492374628364t2734682364t78",
        mobile: "99205294",
        position: "Systemutvikler",
        partnerId: "1",
        picture: "",
        contactPerson: true,
        partnerForum: false,
        active: true
    });

    person.save(function(err, person) {
        if(err) return console.error(err);
    });
    console.log('TestScript: persons added');
}

function insertPartnerType() {
    var partnerType = new PartnerType({
        id: "1",
        name: "Nettverkspartner"
    });
    partnerType.save(function(err, partnerType) {
        if(err) return console.error(err);
    });
    console.log('TestScript: partnertypes added')
}

function insertActivity() {
    var activity = new Activity({
        id: "1",
        title: "Aktivitet 1",
        titleShort: "En artig aktivitet",
        location: "Der borte",
        description: "Dette er beskrivelsen",
        startDate: "01.01.2015",
        endDate: "02.01.2015",
        employeeId: "1",
        deadlineDate: "01.01.2015",
        enrollments: ""
    });
    activity.save(function(err, activity) {
        if(err) return console.error(err);
    });
    console.log('TestScript: activities added')
}

