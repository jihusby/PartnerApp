var React = require("react");
var _ = require("underscore");

var ListGroup = require("react-bootstrap/ListGroup");
var ListGroupItem = require("react-bootstrap/ListGroupItem");
var Input = require("react-bootstrap/Input");

module.exports = React.createClass({

    getInitialState: function() {
        return {
            searchText: ''
        };
    },

    partnerClicked: function(key){
        this.props.partnerSelected(key);
    },
    
    personClicked: function(key){
        this.props.personSelected(key);
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
            searchList.push(<ListGroupItem>Parnere</ListGroupItem>);
            this.props.partners.forEach(function(partner) {
                if(partner.name.toLowerCase().indexOf(searchString)==0){
                    searchList.push(<ListGroupItem onClick={partnerCallback} eventKey={partner.id}>{partner.name}</ListGroupItem>);
                }
            });
                    
            this.props.persons.forEach(function(person) {
                if(person.firstName.toLowerCase().indexOf(searchString)==0 || person.lastName.toLowerCase().indexOf(searchString)){
                    searchList.push(<ListGroupItem onClick={personCallback} eventKey={person.id}>{person.firstName}{" "}{person.lastName}</ListGroupItem>);
                }
            });
        }

        return (
            <div>
                <Input
                    type="Search"
                    value={this.state.searchText}
                    placeholder="Søk på firma eller navn på person"
                    ref="searchPartner"
                    onChange={this.handleSearchInput}/>
                <ListGroup>
                    {searchList}
                </ListGroup>
            </div>
        );
    }
});