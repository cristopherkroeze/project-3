import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAnime from "../components/AddAnime";
import AnimeCard from "../components/AnimeCard"

import { get, post } from "../services/authService";

const API_URL = "http://localhost:4000";


function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {

    const storedToken = localStorage.getItem("authToken");

    get('/projects')

      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );

  
  return (
    <div className="ProjectListPage">

        <AddAnime refreshProjects={getAllProjects} />
      
        {projects.map((project) => {
          return (
            <AnimeCard key={project._id} {...project} />
          );
        })}     
       
    </div>
  );
}

export default ProjectListPage;