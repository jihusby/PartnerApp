var React = require("react");
var _ = require("underscore");

var PartnerBox = require("./PartnerBox.jsx");
var ContactBox = require("./ContactBox.jsx");

var Input = require("react-bootstrap/Input");

module.exports = React.createClass({
    propTypes: {
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getInitialState: function() {
        return {
            searchText: ''
        };
    },

    handleSearchInput: function(e) {
        this.setState({
            searchText: e.target.value
        });
    },

    render: function () {
        var searchList = [];
        var bodyContent;
        if(this.state.searchText.length > 1) {
            var currentSearch = this.state.searchText;
            var partnerCallback = this.partnerClicked;
            var personCallback = this.personClicked;
            var searchString = currentSearch.toLowerCase();
            
            // partners
            var partnerList = [];
            searchList.push(<div className="list-group-item list-heading"><h3 className="list-group-item-heading"><strong>Partnere</strong></h3></div>);
            var partners = this.props.partners;
            partners.forEach(function(partner) {
                if(partner.name.toLowerCase().indexOf(searchString) > -1){
                    partnerList.push(<PartnerBox partner={partner} />);
                }
            });
            
            if(partnerList.length > 0){
                searchList = _.union(searchList, partnerList);
            } else {
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading">Ingen partnere samsvarte med ditt søk.</h4></div>);
            }
            
            // persons
            searchList.push(<div className="list-group-item list-heading"><h3 className="list-group-item-heading"><strong>Kontaktpersoner</strong></h3></div>);
            var contactList = [];
            this.props.contacts.forEach(function(contact) {
                if(contact.firstName.toLowerCase().indexOf(searchString) > -1 || contact.lastName.toLowerCase().indexOf(searchString) > -1){
                    var partnerForPerson = _.find(partners, function(partner){ 
                        return partner.id === contact.partnerId;
                    });
                    if(partnerForPerson) {
                        contact.partnerName = partnerForPerson.name;
                    }
                    contactList.push(<ContactBox contact={contact} showPartner={true} showPosition={true} showFavorite={true} />);
                }
            });
            
            if(contactList.length > 0){
                searchList = _.union(searchList, contactList);
            } else {
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading">Ingen kontakter samsvarte med ditt søk.</h4></div>);
            }
            
            
            bodyContent = (                
                <div className="list-group">
                    {searchList}
                </div>
            );
        } else {
            bodyContent = (
                <div className="logo-container">
                    <img src="images/logo_xs_small.png" className="rbk-logo" />
                </div>
            );
        }

        return (
            <div>
                <Input
                    type="Search"
                    value={this.state.searchText}
                    placeholder="Søk på firma eller navn på person"
                    ref="searchPartner"
                    onChange={this.handleSearchInput}/>
                <br/>
                {bodyContent}
            </div>
        );
    }
});