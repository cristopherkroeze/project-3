import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import AnimeCard from "../components/AnimeCard";

import { get } from "../services/authService";

function AnimeDetailsPage () {


  const [anime, setAnime] = useState(null);

  const { animeId } = useParams()
  console.log("animeId:", animeId)

  const API_URL = "http://localhost:4000"; 

  const getAnime = () => {
      get(`/animes/${animeId}`)
      .then((response) => {
        const oneAnime = response.data;
        setAnime(oneAnime);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {

    getAnime()

  }, [])

  
  return (
    <div className="AnimeDetails">
      {anime && (
        <AnimeCard {...anime}/>
      )}

      <AddComment refreshAnime={getAnime} animeId={animeId} /> 

      {anime && anime.comments && anime.comments.map((element) => {
            return (<CommentCard {...element} /> )
      }
      )}

      <Link to="/animes">
        <button>Back to All Animes</button>
      </Link>

      <Link to={`/animes/edit/${animeId}`}>
        <button>Edit Anime</button>
      </Link>  


    </div>
  );
}

export default AnimeDetailsPage;