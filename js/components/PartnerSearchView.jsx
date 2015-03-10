var React = require("react");
var _ = require("underscore");

var PartnerBox = require("./PartnerBox.jsx");
var ContactBox = require("./ContactBox.jsx");
var Navigator = require("../utils/navigator");

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

    componentDidMount: function() {
        Navigator.goToTop();
        document.getElementById("search-field").className="input-obj";
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
            searchList.push(<div className="list-group-item list-heading gold-header"><h4 className="list-group-item-heading"><strong>Partnere</strong></h4></div>);
            var partners = this.props.partners;
            partners.forEach(function(partner) {
                if(partner.name.toLowerCase().indexOf(searchString) > -1){
                    partnerList.push(<PartnerBox partner={partner} />);
                }
            });
            
            if(partnerList.length > 0){
                searchList = _.union(searchList, partnerList);
            } else {
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading"><small>Ingen partnere samsvarte med ditt søk.</small></h4></div>);
            }
            
            // persons
            searchList.push(<div className="list-group-item list-heading gold-header"><h4 className="list-group-item-heading"><strong>Kontaktpersoner</strong></h4></div>);
            var contactList = [];
            var orderedContactList = _.chain(this.props.contacts)
                .sortBy(function(person){
                    return [person.lastName, person.firstName].join("_");
                });

            orderedContactList.forEach(function(contact) {
                if((contact.firstName.toLowerCase() + " " +contact.lastName.toLowerCase()).indexOf(searchString) > -1){
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
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading"><small>Ingen kontakter samsvarte med ditt søk.</small></h4></div>);
            }
            
            
            bodyContent = (                
                <div className="list-group">
                    {searchList}
                </div>
            );
        } else {
            bodyContent = (
                <div className="logo-container">
                    <img src="images/logo_xs_small.png" className="rbk-logo" /><br/><br/>
                    <h2>Godfoten</h2>
                    <h4>RBK Partner</h4>
                </div>
            );
        }

        return (
            <div className="top-margin">
                <Input
                    id="search-field"
                    type="Search"
                    className="search"
                    value={this.state.searchText}
                    placeholder="Søk på partner eller kontakt"
                    ref="searchPartner"
                    onChange={this.handleSearchInput}/>
                <br/>
                {bodyContent}
            </div>
        );
    }
});