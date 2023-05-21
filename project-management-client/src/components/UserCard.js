import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AnimeCard from './AnimeCard'
import { Link } from 'react-router-dom';

function UserCard({
  _id,
  img,
  email,
  userName,
  name,
  favoriteAnimes,
  favoriteGenre,
  role,
}) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img}  />
        <Card.Title>{userName}</Card.Title>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>Email: {email}</ListGroup.Item>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Role: {role}</ListGroup.Item>
          {favoriteGenre && <ListGroup.Item>Favorite Genre: {favoriteGenre}</ListGroup.Item>}
          <ListGroup.Item><Link to={`/profile/edit/${_id}`} >Edit Profile</Link></ListGroup.Item>
        </ListGroup>
        {favoriteAnimes?.length &&
          favoriteAnimes.map((element) => {
            return(<Card.Body>
              <AnimeCard {...element} />
            </Card.Body>);
          })}
      </Card>
    </>
  );
}
  
  export default UserCard;


                  
                  
                  