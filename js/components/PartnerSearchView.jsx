var React = require("react");

var Label = require("react-bootstrap/Label");
var Input = require("react-bootstrap/Input");

var $ = require("jquery");

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
            var partnerList = this.props.partners.map(function(partner){
               return <option value={partner.name}/>;
            });

            var searchList = [];

            if(this.state.searchText.length > 0) {
               searchList.push()
            }

            return (
                <div>
                    <Input
                        type="Search"
                        value={this.state.searchText}
                        placeholder="Søk på firma eller navn på person"
                        ref="searchPartner"
                        onChange={this.handleSearchInput}/>
                    {searchList}
                </div>
            );
        }
    });


