const mongoose = require('mongoose');

const EntrySchema = require('../schema/entry.schema');

const EntryModel = mongoose.model("Entry", EntrySchema);

function createEntry(entry) {
    return EntryModel.create(entry);
}

function createReview(entryId, review) {
    return EntryModel.updateOne(
        { _id: entryId },
        {
            $push: { 
                reviews:{
                    $each: [review],
                    $sort: { createdDate: -1 },
                }
            },
            $inc: { reviewCount: 1 },
        }
    );
}

function updateReview(entryId, review){
    return EntryModel.updateOne(
        {
            _id: entryId,
            "reviews._id": review._id,
        },
        {
            $set: {
                "reviews.$.content": review.content,
            }
        }
    ).exec();
}

function deleteReview(entryId, reviewId){
    return EntryModel.updateOne(
        {
            _id: entryId,
        },
        {
            $pull: {
                reviews: {
                    _id: reviewId,
                }
            }
        }
    ).exec();
}

function getEntries(limit = 20, skip = 0) {
    return EntryModel.aggregate([
        {
            $project: {
                name: 1,
                about: 1,
                link: 1,
                userName: 1,
                createdDate: 1,
                lastModified: 1,
                reviewCount: 1,
                reviews: { $slice: ['$reviews.userName',3]}
            }
        }
    ]).sort({ createdDate: -1 }).skip(skip).limit(limit).exec();
}

function getEntryById(id) {
    return EntryModel.findById(id).exec();
}

function getEntryByName(name) {
    return EntryModel.find({ name }).exec();
}

async function updateEntry(entry) {
    const doc = await EntryModel.findById(entry.id);
    doc.name = entry.name ? entry.name : doc.name;
    doc.about = entry.about ? entry.about : doc.about;
    doc.detail = entry.detail ? entry.detail : doc.detail;
    doc.link = entry.link ? entry.link : doc.link;
    doc.userName = entry.userName ? entry.userName : doc.userName;
    doc.lastModified = new Date();
    return doc.save();
}

function deleteEntry(id) {
    return EntryModel.deleteOne({ _id: id }).exec();
}

module.exports = {
    createEntry,
    getEntries,
    getEntryById,
    getEntryByName,
    updateEntry,
    deleteEntry,
    createReview,
    updateReview,
    deleteReview
}