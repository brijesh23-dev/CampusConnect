const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Club name is required'],
    unique: true, // Prevents duplicate club names
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Club description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Club category is required'],
    enum: ['Coding', 'Sports', 'Music', 'Arts', 'Academic'], // Matches your user interests
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (the club creator/president)
    required: [true, 'Club creator reference is required']
  },
  isApproved: {
    type: Boolean,
    default: false // Set to false so admins must approve the club first
  },
  // Optional but highly recommended additions for a club:
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  logo: {
    type: String, // URL to the club logo image
    default: ''
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create and export the Club model
const Club = mongoose.model('Club', clubSchema);

module.exports = Club;