import { Schema } from 'mongoose';
import mongoose from '../mongoose';

const noteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    dateEdited: {
        type: Date,
        default: null
    }
});

export default mongoose.model('Note', noteSchema);