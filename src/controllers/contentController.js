const contentTable = require('../models/contentModel');
const notesTable = require('../models/noteModel');
/*Create and Save a new Content----->------adding new Content------------------*/
exports.addNewContent = function (req, res) {
    console.log("req", req.body);
    var user = res.locals.user;
    const content = {
        notesID: req.body.titleid,
        content: req.body.content,
        isChecked: req.body.isChecked
    };

    //  if (user) {
    contentTable(content).save()
        .then((notecontent) => {
            console.log("note content : ", notecontent)
            res.status(200).send(notecontent);
        })
        .catch((err) => {
            res.status(400).send({ error: err, message: "Some Error occured " });
        })
}
/*----------------get contents based on titleid of particular note-------------------*/
exports.getNoteAllContent = function (req, res) {
    console.log("req", req.headers);
    console.log("reqnoteconetnt", req.params);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    // if (user) {
    var objToSend = {
        note_title: '',
        entries: []
    }
    notesTable.findById({ _id: req.params.id })//getSingleNote with noteId
        .then((notesobj, err) => {

            objToSend.note_title = notesobj.title;
            contentTable.find({ notesID: req.params.id }) //getAllContentofNote using noteTitleId
                .then((NoteContents) => {

                    NoteContents.map((individualTitleentry, noteContentIdx) => {
                        objToSend.entries.push({ id: individualTitleentry._id, content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
                        )
                        console.log("sending : ", individualTitleentry)
                    })
                    console.log("drftre", objToSend)
                    res.status(200).send(objToSend);

                })
                .catch(() => {
                    res.status(400).send({ error: err, message: "Note not found " });
                })
        })
}

/*---------------------------updating new Content--------------------------*/
exports.updateNoteContent = function (req, res) {
    console.log("reqofupdatecontent", req.body);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;

    contentTable.findOneAndUpdate(
        { _id: req.body.contentId },
        { $set: { content: req.body.content, isChecked: req.body.isChecked } },
        { new: true }
    )  // updateItems ---->-----------update the todoitems
        .then((updatecontent) => {
            console.log("doc", updatecontent)
            res.status(200).send(updatecontent);
        })
        .catch(() => {
            res.status(400).send({ error: err, message: "Error updating content" });
        })
}

/*-----------updating checkbox-------*/
exports.contentChecked = function (req, res) {
    console.log("reqofupdatecheckbox", req.params);
    // console.log("reqofcontent", req.body.titleid);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    contentTable.findById(
        {_id:req.params.id}
    ) //find content documnet by contentId
    .then((contentObj) => {
                console.log("doc", contentObj);
                contentTable.findOneAndUpdate(
                        { _id: req.params.id },
                        { $set: { isChecked: !contentObj.isChecked } },
                        { new: true }
                    )  // update checkbox
                        .then((updateCheck) => {
                            console.log("doc update", updateCheck);
                            res.status(200).send();
                        })
               // res.status(200).send({ isChecked: ! contentObj.isChecked })
                // res.status(200).send(updateCheck);
            })
    // contentTable.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { $set: { isChecked: !isChecked } },
    //     { new: true }
    // )  // update checkbox
    //     .then((updateCheck) => {
    //         console.log("doc", updateCheck);
    //         res.status(200).send(updateCheck);
    //     })
}
/*---------------------------deleting the content---------------------------------------------------*/
exports.deleteNoteContent = function (req, res) {
    // console.log("reqofdeletecontent", req.params);
    var user = res.locals.user;
    var contentToSend = []
    if (user) {
        contentTable.findOneAndRemove({ _id: req.params.id })// removeNotesContent based on contentid
            .then((deletecontent) => {
                console.log("doc", deletecontent)

                contentTable.find({ notesID: deletecontent.notesID })// getAllContentofNote-->get all contents using titleid-
                    .then((NoteContents) => {
                        // console.log("content", NoteContents)
                        NoteContents.map((individualTitleentry, noteContentIdx) => {
                            contentToSend.push({ id: individualTitleentry._id, content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
                            )
                        })
                        // console.log("sending", contentToSend)
                        res.status(200).send(contentToSend);
                    })
                // res.status(200).send({message:"successfully deleted"});
            })
    }
    else {
        console.log("content not deleted")
        res.status(401).send({ error: "content not deleted" });
    }

}