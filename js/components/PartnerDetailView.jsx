var React = require("react");
var Favorite = require("./Favorite.jsx");

module.exports =

    React.createClass({

        render: function () {
            var partner = this.props.selectedPartner;
            var mailTo = "mailto:" + partner.email;
            var phone = "tel:" + partner.phone;
            var proffLink = "http://www.proff.no/bransjesøk?q=" + partner.name;
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
                  <i className="glyphicon glyphicon-info-sign"></i> <a href={proffLink}>{partner.name} hos proff.no</a><br/>
                </address>
                <h4>Kontaktpersoner</h4>
                <ul className="list-unstyled">
                    {
                        partner.contacts.map(function(contact){
                           return <li key={contact.id}>{contact.firstName}{" "}{contact.lastName} - <small>{contact.position}</small> <Favorite id={contact.id} /></li>  
                        })
                    }
                </ul>
                </div>
            );
        }
    });


