const registrationModel = require('../models/Registration.model');
const { getParticipants } = require('./event.controller');

const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const alreadyRegistered = await RegistrationModel.findOne({
      student: req.user._id,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    const registration = await RegistrationModel.create({
      student: req.user._id,
      event: eventId,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRegistration = async(req,res)=>{
  try{
 const registration = await registrationModel.find({
        student:req.user._id
    }).populate("event");
    res.status(200).json({
        message:"fetched successful registrations",
        success:true,
        registration
    })
  }catch(error){[
    res.status(500).json({
      message:error.message
    })
  ]}
   
}

const getEventParticipants = async(req,res)=>{

try{
    eventParticipants = await registrationModel.find({
    events:req.params.eventId
  }).papulate("student","name email")
  res.status(200).json({
    success:true,
    participatnts:eventParticipants
  })
}catch(error){
  res.status(500).json({
    message:error.message
  })
}
}

module.exports =  {
    getMyRegistration,
    registerForEvent,
    getParticipants,
    getEventParticipants
}