const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const {protect, authorizeRoles} = require('../middleware/auth.middleware');
const {storage} = require('../config/CoudinaryConfig');
const multer = require('multer');
const upload = multer({storage});

router.post('/create',protect,authorizeRoles("club"),upload.single("image"), eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.get('/my-events', protect, authorizeRoles('club','admin'), eventController.getMyevents);
router.get('/:id',eventController.getsingleEvent);
router.put('/update/:id', protect, authorizeRoles('club','admin'), eventController.updateEvent);   
router.delete('/delete/:id', protect, authorizeRoles('club','admin'), eventController.deleteEvent); 

module.exports = router;