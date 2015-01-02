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

        partnerClicked: function(key){
            this.props.partnerSelected(key);
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
                var callback = this.partnerClicked;
                
               this.props.partners.forEach(function(partner) {
                   if(partner.name.toLowerCase().indexOf(currentSearch.toLowerCase())==0){
                       searchList.push(<ListGroupItem onClick={callback} eventKey={partner.id}>{partner.name}</ListGroupItem>);
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


