import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        type: 'string',
        required: true,
    }, description: {
        type: 'string',
    }, tags: {
        type: 'string',
        default: 'General',
    }, date: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model("notes", NotesSchema);