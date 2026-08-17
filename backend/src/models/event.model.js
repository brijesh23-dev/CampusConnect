const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event title is required"],
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "",
        },

        date: {
            type: Date,
            required: [true, "Event date is required"],
        },

        startTime: {
            type: String,
            default: "",
        },

        endTime: {
            type: String,
            default: "",
        },

        venue: {
            type: String,
            required: [true, "Venue is required"],
            trim: true,
        },

        // Reference to the club (User with role "club") that owns the event
        club: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        image: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            enum: ["draft", "published", "cancelled", "approved", "pending"],
            default: "published",
        },

        // Maximum number of attendees (null = unlimited)
        maxParticipants: {
            type: Number,
            default: null,
        },

        requireRSVP: {
            type: Boolean,
            default: true,
        },

        // Virtual-friendly: populated from Registration collection in controllers
        // Kept here as a lightweight counter for quick access in list views
        registeredStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);
