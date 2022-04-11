const mongoose = require('mongoose');


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
  sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'laws.sections'}],

}, {timestamps: true});


const sectionsSchema = new mongoose.Schema({
  section: {
    type: Number,
    required: true,
    unique: true,

  },
  content: {
    type: String,
    required: true,
  },

});

module.exports.Law_contents = mongoose.model('laws.sections', sectionsSchema);
module.exports.Law = mongoose.model('laws', lawSchema);
