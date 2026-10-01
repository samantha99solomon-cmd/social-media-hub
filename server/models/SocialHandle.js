const mongoose = require('mongoose');

const socialHandleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['twitter', 'instagram', 'facebook', 'linkedin', 'tiktok', 'youtube', 'other'],
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  url: String,
  followers: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SocialHandle', socialHandleSchema);
