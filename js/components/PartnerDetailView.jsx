var React = require("react");
var Favorite = require("./Favorite.jsx");

var _ = require("underscore");

module.exports =

    React.createClass({

        render: function () {
            var partner = this.props.selectedPartner;
            var mailTo = "mailto:" + partner.email;
            var phone = "tel:" + partner.phone;

            return (
                <div>
                <h3>{partner.name}{" "}</h3>
                <address>
                <strong>Adresse</strong><br/>
                  {partner.address}<br/>
                  {partner.zipCode} {partner.city}<br/><br/>
                <strong>Kontakt</strong><br/>
                  <i className="glyphicon glyphicon-earphone"></i> <a href={phone}>{partner.phone}</a><br/>
                  <i className="glyphicon glyphicon-envelope"></i> <a href={mailTo}>{partner.email}</a><br/>
                  <i className="glyphicon glyphicon-globe"></i> <a href={partner.webSite}>{partner.webSite}</a><br/>
                </address>
                <h4>Kontaktpersoner</h4>
                <ul className="list-unstyled">
                    {
                        partner.contacts.map(function(contact){
                            // avoids circular structure that causes an error when serializing to JSON
                            var contactDto = _.omit(contact, "partner");
                            var contactName = contact.firstName + " " + contact.lastName;
                           return <li key={contact.id}>{contactName} - <small>{contact.position}</small> <Favorite contact={contactDto} /></li>  
                        })
                    }
                </ul>
                </div>
            );
        }
    });


