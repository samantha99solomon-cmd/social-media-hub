const express = require('express');
const SocialHandle = require('../models/SocialHandle');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all handles for user
router.get('/', auth, async (req, res) => {
  try {
    const handles = await SocialHandle.find({ userId: req.user.id });
    res.json(handles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new handle
router.post('/', auth, async (req, res) => {
  const handle = new SocialHandle({
    ...req.body,
    userId: req.user.id
  });
  
  try {
    const newHandle = await handle.save();
    res.status(201).json(newHandle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update handle
router.put('/:id', auth, async (req, res) => {
  try {
    const handle = await SocialHandle.findById(req.params.id);
    if (!handle) return res.status(404).json({ message: 'Handle not found' });
    if (handle.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    Object.assign(handle, req.body);
    handle.updatedAt = Date.now();
    const updated = await handle.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete handle
router.delete('/:id', auth, async (req, res) => {
  try {
    const handle = await SocialHandle.findById(req.params.id);
    if (!handle) return res.status(404).json({ message: 'Handle not found' });
    if (handle.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    
    await handle.deleteOne();
    res.json({ message: 'Handle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
