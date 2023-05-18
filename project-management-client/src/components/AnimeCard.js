import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CommentCard from './CommentCard';
import { Link } from "react-router-dom";

function AnimeCard({
  _id,
  img,
  title,
  rating,
  genre,
  description,
  mainCharacter,
  voiceActor,
  addedBy,
  comments
}) {
  return (
    <>
      <Card style={{ width: "40vw" }}>
        <Card.Img variant="top" src={img} />

        <Card.Body>
        <Card.Title>
        <Link to={`/animes/${_id}`}>
        {title}
        </Link>
        
        </Card.Title>
        Plot:
        <br></br>
        {description}
        </Card.Body>
        
        <ListGroup className="list-group-flush">
          {rating && <ListGroup.Item>Rating: {rating}</ListGroup.Item>}
          <ListGroup.Item>Genre: {genre}</ListGroup.Item>
          {mainCharacter && <ListGroup.Item>Main Character: {mainCharacter.name}</ListGroup.Item>}
          {voiceActor && <ListGroup.Item>Voice Actor: {voiceActor.name}</ListGroup.Item>}
          {addedBy && <ListGroup.Item>Added By: {addedBy.userName}</ListGroup.Item>}
        </ListGroup>
        <Card.Body>
        
        {comments?.length &&
          comments.map((element) => {
            return(
              <CommentCard {...element} />
            );
          })}

          {comments?.length>3 && <button>See More Comments</button>}
        </Card.Body>
      </Card>
    </>
  );
}
  
  export default AnimeCard;


