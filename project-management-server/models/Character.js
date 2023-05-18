const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
    {
        img: { 
            type: String, 
            unique: true, 
            },
        name: { 
            type: String, 
            unique: true, 
            required: true 
            },
        anime: { type: Schema.Types.ObjectId, ref: "Animes", default: null},
        voicedBy: { type: Schema.Types.ObjectId, ref: "VoiceActor", default: null},
        createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null}
    },
    {
        timeseries: true,
        timestamps: true
    });

module.exports = model("Character", characterSchema);
