const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {protect, authorizeRoles} = require('../middleware/auth.middleware');

router.post('/create', protect, authorizeRoles('club','admin'), eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.get('/:id',eventController.getsingleEvent);
router.get('/my-events', protect, authorizeRoles('club','admin'), eventController.getMyevents);
router.put('/update/:id', protect, authorizeRoles('club','admin'), eventController.updateEvent);   
router.delete('/delete/:id', protect, authorizeRoles('club','admin'), eventController.deleteEvent); 

module.exports = router;