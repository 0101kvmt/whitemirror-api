import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

import Mirror from './mirror';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a valid username!'],
    unique: [true, 'Sorry, this username is already taken.'],
    maxLength: 15
  },
  password: {
    type: String,
    min: [6, 'Your password should be greater than 6 characters.']
  },
  mirror: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mirror'
    }
  ],
  toDoList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ToDo'
  }],
  location: [{
    latitude: {
      type: String,
      default: '37.2981303'
    },
    longitude: {
      type: String,
      default: '-121.783822'
    }
  }],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
