const mongoose = require('mongoose');

const lawContent = new mongoose.Schema({
    section: {
        type: Number,
        required: true,
        unique: true,
        
    },
    content: {
        type:String,
        required: true
    }

});

const lawSchema = new mongoose.Schema({
    law_name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    law_content: [lawContent]
}, { timestamps: true });

module.exports = mongoose.model("Law", lawSchema);