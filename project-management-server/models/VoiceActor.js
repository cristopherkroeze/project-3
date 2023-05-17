const { model, Schema } = require('mongoose')

const voiceActorSchema = new Schema(
    {
        title: String,
        description: String,
        animes: [ { type: Schema.Types.ObjectId, ref: 'Anime' } ]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Task", voiceActorSchema)