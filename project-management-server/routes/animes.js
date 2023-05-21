var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


const Anime = require('../models/Anime');
const User = require('../models/User')
const Comment = require('../models/Comment')

router.get('/', (req, res, next) => {
    Anime.find()
      .populate(['mainCharacter', 'addedBy', 'ratedBy', 'comments'])
      .then(allAnimes => {
        console.log("allAnimes:", allAnimes)
        res.json(allAnimes)
      })
      .catch(err => {
        console.log("ERROR:", err)
        // res.json(err)
      });
  });

router.post("/", (req, res, next) => {

    const { img, title, rating, genre, description, mainCharacter, voiceActor, addedBy, ratedBy, comments } = req.body;
    
    Anime.findOne({title})
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
    console.log("animeId:", animeId)    
    if (!mongoose.Types.ObjectId.isValid(animeId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
      Anime.findByIdAndRemove(animeId)
         .then(() => res.json({ message: `Anime with ${animeId} is removed successfully.` }))
         .catch(error => res.json(error));

    
  });

  router.post("/addComment/:animeId", (req, res, next) => {
    const {animeId} = req.params;
    const { title, comment, addedBy } = req.body;

    Comment.create({ title, comment, addedBy })
    .then(response => {
      Anime.findByIdAndUpdate(animeId,
        {
          $addToSet: {comments: response._id}
        },
        {new: true})
        .then((updatedAnime) => {
          console.log("updated anime:", updatedAnime)
        })
        .catch(error => res.json(error));
      res.json(response)
    })
    .catch(err => res.json(err));


    });

    

  router.delete('/deleteComment/:commentId', (req, res, next) => {
    const { commentId } = req.params;
    console.log("commentId:", commentId)    
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
      Comment.findByIdAndDelete(commentId)
         .then(() => res.json({ message: `Comment with ${commentId} is removed successfully.` }))
         .catch(error => res.json(error));
    
  });
   
  router.post("/addFavorite/:animeId", (req, res, next) => {
    const {animeId} = req.params;
    const { userId } = req.body;

      
    User.findByIdAndUpdate(userId,
        {
          $addToSet: {favoriteAnimes: animeId}
        },
        {new: true})
        .then((updatedUser) => {
          console.log("updated User:", updatedUser)
        })
        .catch(error => res.json(error));

    });

    router.post("/removeFavorite/:animeId", (req, res, next) => {
      const {animeId} = req.params;
      const { userId } = req.body;
  
        
      User.findByIdAndUpdate(userId,
          {
            $pull: {favoriteAnimes: animeId}
          },
          {new: true})
          .then((updatedUser) => {
            console.log("updated User:", updatedUser)
          })
          .catch(error => res.json(error));
  
      });


module.exports = router;