const Schema = require('mongoose').Schema;

const EntrySchema = new Schema(
    {
        name: {
            type:String,
            required: true,
        },
        about: {
            type:String,
            required: true,
        },
        detail: {
            type:String,
        },
        link: {
            type:String,
            required: true,
        },
        userName: {
            type:String,
            required: true,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        // topics: [],
        createdDate: {
            type: Date,
            default: Date.now,
        },
        lastModified: {
            type: Date,
            default: Date.now,
        },
        reviews: [{
            userName: String,
            content: String,
            createdDate: {
                type: Date,
                default: Date.now,
            },
            lastModified: {
                type: Date,
                default: Date.now,
            },
        }],
    },
    {
        collection: 'repository'
    }
)

// EntrySchema.pre('validate', function(next) {
//     console.log("sdfsdf",this.reviews);
//     this.reviewCount = this.reviews.length;
//     return next();
// });

module.exports = EntrySchema;