import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAnime from "../components/AddAnime";
import AnimeCard from "../components/AnimeCard"
import {AnimeContext} from "../context/anime.context"
import { get, post } from "../services/authService";

const API_URL = "http://localhost:4000";


function AllAnimesPage() {
  const [animes, setAnimes] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  let showAllComments = false;
  const {character, setCharacter} = useContext(AnimeContext)

  const getAllAnimes = () => {
  

    get('/animes')

      .then((response) => {
        setAnimes(response.data)
        console.log(response.data)
        console.log("animes:", animes)
      })
      
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllAnimes();
  }, [] );

  
  return (
    <div className="AllAnimesPage">

        {storedToken && <AddAnime refreshAnimes={getAllAnimes} />}
        
        {animes.map((element) => {
          return (
            <>
            <AnimeCard key={element._id} {...element} showAllComments = {showAllComments} storedToken = {storedToken} homePageTrue ={true}/>
            </>
          );
        })}     
       
    </div>
  );
}

export default AllAnimesPage;