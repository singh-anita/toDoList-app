
//create a schema for notesTable
var notesTableSchema = new Schema({
// id of the owner
uId: String,
title: String,
createdAt: {
    type: Date,
    default : Date.now()
},
updatedAt : Date,
deletedAt : Date,
//collaborators of the note
sharedWith: Array
});

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
var Token = mongoose.model('Token', TokenSchema);
var notesTable = mongoose.model('notesTable', notesTableSchema);
var contentTable = mongoose.model('contentTable', contentTableSchema);


//insert new token into the database -. sign up functionality
exports.newToken = function (tokendata) {
    //return the promise object
    return Token(tokendata);//passes the token data to user model
}
/*based on userId GET TOKEN OBJECT FROM THE COLLECTION */
exports.checkuId = function (uId) {
    return Token.findOne({ uId: uId })
}

/* insert a new note title into the notesCollection  collection using save*/
exports.insertTitle = function (userTableId, noteTitle) {
    return notesTable({ uId: userTableId, title: noteTitle, date: new Date() }).save()
}
//get notes title for dashboard
exports.getNotesTitle = function (userId) {
    /*returns an array consisting of note titles created by a particular user*/
    return notesTable.find({ uId: userId , deletedAt: { $eq: null} });
}
exports.getSingleTitle = function (TitleId){
    return notesTable.findById({_id:TitleId})
}


//find single note with title and titleid for dashboard
//exports.getTitleId =function(titleId,titlevalue){
   // return notesTable.findById({ uId: titleId ,title:titlevalue});
//}
/* insert individual contents on the basis of particular notetitleid using save*/
exports.insertNoteContent = function (noteTitleId, individualNotesEntry, checkBoxStatus) {
    return contentTable({ notesID: noteTitleId, content: individualNotesEntry, isChecked: checkBoxStatus }).save()
}

/*---------get all contents using titleid--------*/
exports.getAllContentofNote = function(noteTitleId){
    console.log(noteTitleId)
    return contentTable.find({ notesID : noteTitleId })
}

//get the uid which is bound to the token
exports.getUId = function(tokenValue){
    return Token.findOne({ token : tokenValue })
}



/*-------delete token of particular user when logout-----*/
exports.deleteUserToken = function(tokenvalue){
    console.log("usersjs",tokenvalue)
   return Token.findOneAndRemove({token:tokenvalue})
}
//{ username: 'starlord55' }, { username: 'starlord88' }

/*-----------update the todoitems -------------------------- */
exports.updateItems = function(contentId, content, isChecked){
    console.log("db",contentId, content, isChecked)
    return contentTable.findOneAndUpdate({ _id : contentId } , { $set : { content : content, isChecked : isChecked } }, { new: true })
}

/*----------deleteing the todoitems ---------------*/
exports.removeNotesContent = function(contentId){
    return contentTable.findOneAndRemove({ _id : contentId })
}

/*-----------update the todotitle -------------------------- */
exports.updateTitles = function(titleId, title){
    console.log("db",titleId, title)
    return notesTable.findOneAndUpdate({ _id : titleId } , { $set : { title: title } }, { new: true })
}


/*----------deleteing the todoTitles ---------------*/
exports.deleteNotesTitle = function(titleId){
    console.log("rtttid",titleId)
    return  notesTable.findOneAndUpdate({ _id : titleId },{ $set : {deletedAt : Date.now()} }, {new : true} )
}
/*----------deleteing the todoitems ---------------*/
//exports.getContent = function(notesId){
  //  return contentTable.find({ notesID  : notesId })
//}
