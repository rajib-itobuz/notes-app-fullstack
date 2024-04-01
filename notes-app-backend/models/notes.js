import mongoose from "mongoose";

const notes = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        trim: true,
        type: String,
        required: true,
    },
    userId: {
        trim: true,
        type: String,
        required: true,
    },
    bgColor: {
        trim: true,
        type: String,
        required: true,
        default: 'bg-danger-subtle'
    },
    isHidden: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });


export const NotesApp = mongoose.model("Notes", notes);