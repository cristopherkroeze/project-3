var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


const Anime = require('../models/Anime');

router.get('/', (req, res, next) => {
    Anime.find()
      .populate('mainCharacter')
      .populate('voiceActor')
      .populate('addedBy')
      .populate('ratedBy')
      .populate('comments')
      .then(allAnimes => res.json(allAnimes))
      .catch(err => res.json(err));
  });

router.post("/", (req, res, next) => {

    const { img, title, rating, genre, description, mainCharacter, voiceActor, addedBy, ratedBy, comments } = req.body;
    
    Anime.findOne(title)
         .then((foundAnime) => {
          if(foundAnime) {
            res.status(400).json({ message: "Anime already exists" });
            return;
          }
         })


    Anime.create({ img, title, rating, genre, description, mainCharacter, voiceActor, addedBy, ratedBy, comments })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });

router.get('/:animeId', (req, res, next) => {
    const { animeId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(animeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Anime.findById(animeId)
      .populate('mainCharacter')
      .populate('voiceActor')
      .populate('addedBy')
      .populate('ratedBy')
      .populate('comments')
      .then(anime => res.status(200).json(anime))
      .catch(error => res.json(error));
  });
  
  
  router.put('/:animeId', (req, res, next) => {
    const { animeId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(animeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Anime.findByIdAndUpdate(animeId, req.body, { new: true })
      .then((updatedAnime) => res.json(updatedAnime))
      .catch(error => res.json(error));
  });
  
  router.delete('/:animeId', (req, res, next) => {
    const { animeId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(animeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Anime.findByIdAndRemove(animeId)
      .then(() => res.json({ message: `Anime with ${animeId} is removed successfully.` }))
      .catch(error => res.json(error));
  });
   

module.exports = router;