import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CommentCard from "./CommentCard";
import CharacterCard from "./CharacterCard";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { post } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function AnimeCard({
  _id,
  img,
  title,
  rating,
  genre,
  description,
  mainCharacter,
  addedBy,
  comments,
  showAllComments,
  storedToken,
  homePageTrue,
  favoriteAnimesList
}) {
  const API_URL = "http://localhost:4000";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let viewWidth = 40
  if (favoriteAnimesList) {
    viewWidth = 15
  }
  console.log(viewWidth)
  const handleRating = (newRating: number) => {
    console.log("hi");
    let userId = user._id;
    const requestBody = { userId, newRating };
    post(`/animes/addRating/${_id}`, requestBody)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.log(error));
    window.location.reload(false);
  };

  const onPointerMove = (value: number) => console.log(value);

  const addToFavorites = () => {
    let userId = user._id;
    const requestBody = { userId };

    axios
      .post(`${API_URL}/animes/addFavorite/${_id}`, requestBody)
      .then((response) => {
        navigate(`/profile/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  const removeFromFavorites = () => {
    let userId = user._id;
    const requestBody = { userId };

    axios
      .post(`${API_URL}/animes/removeFavorite/${_id}`, requestBody)
      .then((response) => {
        navigate(`/profile/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>

    <Card style={{ width: `${viewWidth}vw` }}>
        <Card.Img variant="top"  src={img} />

        <Card.Body>
          <Card.Title>
            <Link to={`/animes/${_id}`}>{title}</Link>
          </Card.Title>
          Plot:
          <br></br>
          {description}
        </Card.Body>

        <ListGroup className="list-group-flush">
          {rating && <ListGroup.Item>Rating: {rating}</ListGroup.Item>}
          {showAllComments && (
            <Rating onClick={handleRating} onPointerMove={onPointerMove} />
          )}
          <ListGroup.Item>Genre: {genre}</ListGroup.Item>
          {mainCharacter && (
            <ListGroup.Item>
              <CharacterCard mainCharacter={mainCharacter} viewWidth = {viewWidth} />
            </ListGroup.Item>
          )}

          {addedBy && (
            <ListGroup.Item>Added By: {addedBy.userName}</ListGroup.Item>
          )}
        </ListGroup>
        <Card.Body>
          {storedToken && showAllComments && <AddComment animeId={_id} />}
        </Card.Body>

        <Card.Body>
          {showAllComments ? (
            <>
              {comments && comments.length ? (
                <>
                  {comments.map((element) => {
                    return <CommentCard {...element} animeId={_id} />;
                  })}
                </>
              ) : (
                <p>No Comments</p>
              )}
            </>
          ) : (
            (() => {
              if (!comments?.length) {
                return <p>No Comments</p>;
              } else if (comments.length === 1) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} />
                  </>
                );
              } else if (comments.length === 2) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} />
                    <CommentCard {...comments[1]} animeId={null} />
                  </>
                );
              } else if (comments.length >= 3) {
                return (
                  <>
                    <CommentCard {...comments[0]} animeId={null} />
                    <CommentCard {...comments[1]} animeId={null} />
                    <CommentCard {...comments[2]} animeId={null} />
                  </>
                );
              }
            })()
          )}

          {homePageTrue && (
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {comments?.length > 3 && (
                  <Link to={`/animes/${_id}`}>
                    <button>See More Comments</button>
                  </Link>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {storedToken && (
                  <button onClick={addToFavorites}>Add to Favorites</button>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {storedToken && (
                  <button onClick={removeFromFavorites}>
                    Remove From Favorites
                  </button>
                )}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default AnimeCard;
