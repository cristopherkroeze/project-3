const { model, Schema } = require('mongoose')

const voiceActorSchema = new Schema(
    {
        name : { 
            type: String,
            required: true  
            },
        rating: { 
            type: Number  
            },
        country: { 
            type: String
            },
        animes: [ { type: Schema.Types.ObjectId, ref: "Anime"} ],
        addedBy: { type: Schema.Types.ObjectId, ref: "User", default: null},
        ratedBy: [ { type: Schema.Types.ObjectId, ref: "User"} ],
        comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("VoiceActor", voiceActorSchema)