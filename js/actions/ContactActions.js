/**
 *
 * Created by aj on 06/01/15.
 */
var Reflux = require("reflux");

module.exports = Reflux.createActions(
    [
        "setFavorites",
        "getFavorites",
        "setContactNotes",
        "getContactNotes",
        "getById",
        "remove"
    ]
);
