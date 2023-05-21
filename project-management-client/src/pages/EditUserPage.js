import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import genres from "../animeGenres";
const API_URL = "http://localhost:4000";

function EditUserPage() {

  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("Action");

  const { userId } = useParams(); 

  const handleSubmit = (e) => {                    
    e.preventDefault();
    const requestBody = { img, name, favoriteGenre: genre };
 
    axios
      .put(`${API_URL}/auth/${userId}`, requestBody)
      .then((response) => {
        console.log("Updated:", response.data)
        navigate(`/profile/${userId}`)
      })
      .catch((err) => {
        console.log(err)
      })
  };


  useEffect(() => {
    console.log("EDIT USER PAGE USE EFFECT OCCURED")
    axios
      .get(`${API_URL}/auth/${userId}`)
      .then((response) => {
        const oneUser = response.data;
        console.log("oneUser:", oneUser)
        setImg(oneUser.img);
  setName(oneUser.name);
  setGenre(oneUser.favoriteGenre)
  
      })
      .catch((error) => console.log(error));
    
  }, []);

  
  return (
    <div className="EditUserPage">
      <form onSubmit={handleSubmit}>
    <Card style={{ width: "40vw" }}>
        <Card.Title>
        Edit Profile:
        </Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
          <label>Image:</label>
        <input
          type="text"
          name="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        </ListGroup.Item>
          <ListGroup.Item>
          <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
          </ListGroup.Item>
          <ListGroup.Item>
          <label>Favorite Genre:</label>
        <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
        {genres.map((element) => {
          return(<option> {element} </option>)
        })}
        </select>
          </ListGroup.Item>
          </ListGroup>
        <Card.Body>
        <button type="submit">Submit</button>
        
        </Card.Body>
      </Card>
      </form>
    </div>
  );
}

export default EditUserPage;