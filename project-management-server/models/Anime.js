const { model, Schema } = require('mongoose')

const animeSchema = new Schema(
    {
        title: String,
        description: String,
        voiceActor: [ { type: Schema.Types.ObjectId, ref: 'VoiceActor' } ]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Anime", animeSchema)