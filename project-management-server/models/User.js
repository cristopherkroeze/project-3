const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        img : { 
            type: String  
            },
        email: { 
            type: String, 
            unique: true, 
            required: true 
            },
        userName: { 
            type: String, 
            unique: true, 
            required: true 
            },
        password: { 
            type: String, 
            required: true 
            },
        name: { 
            type: String, 
            required: true 
            },
        favoriteAnimes: [ { type: Schema.Types.ObjectId, ref: "Animes"} ],
        favoriteVoiceActor: { type: Schema.Types.ObjectId, ref: "VoiceActor"},
        favoriteGenre: { 
            type: String  
            }
    },
    {
        timeseries: true,
        timestamps: true
    });

module.exports = model("User", userSchema);
