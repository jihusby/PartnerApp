var React = require("react");
var moment = require("moment");

module.exports = React.createClass({
    onClickActivity: function(id) {
        routie("activity/" + id);
    },
    render: function() {
        var endDate ="";
        var date = "";
        var activity = this.props.activity;
        var dateFormat = "DD.MM YYYY HH.mm";
        if(activity.startDate){
            date = moment(activity.startDate).format(dateFormat);
            if(activity.endDate){
                date = date + " - " + moment(activity.endDate).format(dateFormat);
            }
        }
        return (
            <a className="list-group-item" onClick={this.onClickActivity.bind(this, activity.id)}>
                <h4 className="list-group-item-heading">{activity.titleShort}</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <p className="list-group-item-text">{date}</p>   
                    </div>
                    <div className="col-xs-6">
                        <p className="list-group-item-text firm-list-item">{activity.location}</p>
                    </div>
                </div>
            </a>
        );
    }
});