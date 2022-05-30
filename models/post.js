const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String ,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    review: [{
        name: String,
        reviewMessage: String,
        mark: {
            type: Number,
            max: 10,
            min: 0,
        }
    }],
    tag: {
        type: String, 
        required: true
    }
}, { timestamps: true });

// [{
//     "title": "Name",
//     "author": "Author",
//     "date": new Date(),
//     "description": "desc",
//     "review": {
//         "name": "name",
//         "reviewMessage": "good!",
//         "mark": 5
//     }
// }]



const Post = mongoose.model('Post', postSchema);
module.exports = Post;

