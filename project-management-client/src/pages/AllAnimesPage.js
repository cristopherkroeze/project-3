import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAnime from "../components/AddAnime";
import AnimeCard from "../components/AnimeCard"

import { get, post } from "../services/authService";

const API_URL = "http://localhost:4000";


function AllAnimesPage() {
  const [animes, setAnimes] = useState([]);

  const getAllAnimes = () => {

    const storedToken = localStorage.getItem("authToken");

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

        {/* <AddAnime refreshAnimes={getAllAnimes} /> */}
      
        {animes.map((element) => {
          return (
            <AnimeCard key={element._id} {...element} />
          );
        })}     
       
    </div>
  );
}

export default AllAnimesPage;