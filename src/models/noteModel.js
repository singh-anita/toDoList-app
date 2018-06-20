var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');
//create a schema for notesTable
var notesTableSchema = new Schema({
    // id of the owner
    uId: String,
    title: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
    deletedAt: Date,
    //collaborators of the note
    sharedWith: Array
});

module.exports = mongoose.model('notesTable', notesTableSchema);