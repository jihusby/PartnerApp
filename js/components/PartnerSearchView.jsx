var React = require("react");

var ListGroup = require("react-bootstrap/ListGroup");
var ListGroupItem = require("react-bootstrap/ListGroupItem");
var Input = require("react-bootstrap/Input");

module.exports =

    React.createClass({

        getInitialState: function() {
            return {
                searchText: ''
            };
        },

        handleSearchInput: function() {
           this.setState({
               searchText: this.refs.searchPartner.getValue()
           });
        },

        render: function () {
            var searchList = [];

            if(this.state.searchText.length > 0) {
               var currentSearch = this.state.searchText;
               this.props.partners.forEach(function(partner) {
                   var name = partner.name;
                   if(name.toLowerCase().indexOf(currentSearch.toLowerCase())==0){
                       searchList.push(<ListGroupItem>{partner.name}</ListGroupItem>);
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


