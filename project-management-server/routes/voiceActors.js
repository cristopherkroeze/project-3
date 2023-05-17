var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


const VoiceActor = require('../models/VoiceActor');

router.get('/', (req, res, next) => {
    VoiceActor.find()
      .populate('animes')
      .populate('addedBy')
      .populate('ratedBy')
      .populate('comments')
      .then(allVoiceActors => res.json(allVoiceActors))
      .catch(err => res.json(err));
  });

router.post("/", (req, res, next) => {

    const { name, rating, country, animes, addedBy, ratedBy, comments } = req.body;
   
    VoiceActor.findOne(title)
         .then((foundVoiceActor) => {
          if(foundVoiceActor) {
            res.status(400).json({ message: "Voice Actor already exists" });
            return;
          }
         })

    VoiceActor.create({ name, rating, country, animes, addedBy, ratedBy, comments })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });

router.get("/:voiceActorId", (req, res, next) => {
  const { voiceActorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(voiceActorId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  VoiceActor.findById(voiceActorId)
    .populate("animes")
    .populate("addedBy")
    .populate("ratedBy")
    .populate("comments")
    .then((VoiceActor) => res.status(200).json(VoiceActor))
    .catch((error) => res.json(error));
});
  
  
  router.put('/:voiceActorId', (req, res, next) => {
    const { voiceActorId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(voiceActorId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    VoiceActor.findByIdAndUpdate(voiceActorId, req.body, { new: true })
      .then((updatedVoiceActor) => res.json(updatedVoiceActor))
      .catch(error => res.json(error));
  });
  
  router.delete('/:voiceActorId', (req, res, next) => {
    const { voiceActorId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(voiceActorId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    VoiceActor.findByIdAndRemove(voiceActorId)
      .then(() => res.json({ message: `VoiceActor with ${voiceActorId} is removed successfully.` }))
      .catch(error => res.json(error));
  });
   

module.exports = router;