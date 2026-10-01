const express = require('express');
const Reminder = require('../models/Reminder');
const auth = require('../middleware/auth');
const router = express.Router();

// Create reminder
router.post('/', auth, async (req, res) => {
  const reminder = new Reminder({
    ...req.body,
    userId: req.user.id
  });
  
  try {
    const newReminder = await reminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all reminders for user
router.get('/', auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).sort({ dueDate: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update reminder
router.put('/:id', auth, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    if (reminder.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    Object.assign(reminder, req.body);
    const updated = await reminder.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete reminder
router.delete('/:id', auth, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    if (reminder.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    await reminder.deleteOne();
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
