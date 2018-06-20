var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');
//create a schema for contentTable
var contentTableSchema = new Schema({

    // the id of the note it is present in
    notesID: String,
    content: String,
    isChecked: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('contentTable', contentTableSchema);