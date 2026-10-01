const express = require('express');
const ChatGroup = require('../models/ChatGroup');
const auth = require('../middleware/auth');
const router = express.Router();

// Create group
router.post('/groups', auth, async (req, res) => {
  const group = new ChatGroup({
    ...req.body,
    createdBy: req.user.id
  });
  
  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all groups for user
router.get('/groups', auth, async (req, res) => {
  try {
    const groups = await ChatGroup.find({ members: req.user.id }).populate('members', 'username profilePicture');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add member to group
router.post('/groups/:groupId/members', auth, async (req, res) => {
  try {
    const group = await ChatGroup.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    const { userId } = req.body;
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get group messages
router.get('/groups/:groupId/messages', auth, async (req, res) => {
  try {
    const group = await ChatGroup.findById(req.params.groupId).populate('messages.userId', 'username profilePicture');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group.messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
