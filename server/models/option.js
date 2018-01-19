import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const options = ['Weather', 'Time', 'Icon', 'To-do', 'Quotes', 'News', 'Twitter'];


let OptionSchema = new Schema({
  option1: {
     type: String,
     enum: options
    },
  font: {
    type: String,
    default: 'Raleway'
  },
  fontSize: {
    type: Number,
    default: 12
  },
  padding: {
    type: Number,
    default: 5
  }
});


module.exports = mongoose.model('Option', OptionSchema);