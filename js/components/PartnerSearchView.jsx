var React = require("react");
var _ = require("underscore");

var PartnerBox = require("./PartnerBox.jsx");
var ContactBox = require("./ContactBox.jsx");

var Input = require("react-bootstrap/Input");

module.exports = React.createClass({

    getInitialState: function() {
        console.log("--initial state");
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

        if(this.state.searchText.length > 0) {
            var currentSearch = this.state.searchText;
            var partnerCallback = this.partnerClicked;
            var personCallback = this.personClicked;
            var searchString = currentSearch.toLowerCase();
            
            // partners
            var partnerList = [];
            searchList.push(<div className="list-group-item list-heading"><h3 className="list-group-item-heading"><strong>Partnere</strong></h3></div>);
            var partners = this.props.partners;
            partners.forEach(function(partner) {
                if(partner.name.toLowerCase().indexOf(searchString)==0){
                    partnerList.push(<PartnerBox partner={partner} />);
                }
            });
            
            if(partnerList.length > 0){
                searchList = _.union(searchList, partnerList);
            } else {
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading">Ingen partnere samsvarte med ditt søk.</h4></div>);
            }
            
            // persons
            var contacts = this.props.persons;
            searchList.push(<div className="list-group-item list-heading"><h3 className="list-group-item-heading"><strong>Kontakter</strong></h3></div>);
            var contactList = [];
            contacts.forEach(function(contact) {
                if(contact.firstName.toLowerCase().indexOf(searchString)==0 || contact.lastName.toLowerCase().indexOf(searchString)==0){
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
        }

        return (
            <div>
                <Input
                    type="Search"
                    value={this.state.searchText}
                    placeholder="Søk på firma eller navn på person"
                    ref="searchPartner"
                    onChange={this.handleSearchInput}/>
                <div className="list-group">
                    {searchList}
                </div>
            </div>
        );
    }
});