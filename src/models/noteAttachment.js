var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');

var noteAttachmentSchema= new Schema({
        uId : String,
        notesID : String,
        attachmentName :{
            type: String,
            required: true
        },
        size : String,
        mimeType : String

    });

module.exports = mongoose.model('noteAttachment', noteAttachmentSchema);