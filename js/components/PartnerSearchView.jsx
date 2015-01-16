var React = require("react");
var _ = require("underscore");

var PartnerBox = require("./PartnerBox.jsx");
var PersonBox = require("./PersonBox.jsx");

var Input = require("react-bootstrap/Input");

module.exports = React.createClass({

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

        if(this.state.searchText.length > 0) {
            var currentSearch = this.state.searchText;
            var partnerCallback = this.partnerClicked;
            var personCallback = this.personClicked;
            var searchString = currentSearch.toLowerCase();
            
            // partners
            var partnerList = [];
            searchList.push(<div className="list-group-item"><h3 className="list-group-item-heading"><strong>Partnere</strong></h3></div>);
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
            var persons = this.props.persons;
            searchList.push(<div className="list-group-item"><h3 className="list-group-item-heading"><strong>Personer</strong></h3></div>);
            var personList = [];
            persons.forEach(function(person) {
                if(person.firstName.toLowerCase().indexOf(searchString)==0 || person.lastName.toLowerCase().indexOf(searchString)==0){
                    var partnerForPerson = _.find(partners, function(partner){ return !!_.find(partner.contacts, function(contact) { return contact.id == person.id; });});
                    if(partnerForPerson) person.partnerName = partnerForPerson.name;
                    personList.push(<PersonBox person={person} />);
                }
            });
            
            if(personList.length > 0){
                searchList = _.union(searchList, personList);
            } else {
                searchList.push(<div className="list-group-item"><h4 className="list-group-item-heading">Ingen personer samsvarte med ditt søk.</h4></div>);
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