var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');

var noteAttachmentSchema= new Schema({
    imageId: String,
    uId: String,
    notesID: String,
    originalName: String,
    savedName: String,
    mimeType: String
    });

module.exports = mongoose.model('noteAttachmentModel', noteAttachmentSchema);