const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
    {
        img: { 
            type: String, 
            unique: true, 
            required: true 
            },
        name: { 
            type: String, 
            unique: true, 
            required: true 
            },
        anime: { 
            type: String 
            },
        voicedBy: { 
            type: { type: Schema.Types.ObjectId, ref: "VoiceActor"}
            },
        createdBy: { 
            type: { type: Schema.Types.ObjectId, ref: "User"},
            required: true 
            }
    },
    {
        timeseries: true,
        timestamps: true
    });

module.exports = model("Character", characterSchema);
