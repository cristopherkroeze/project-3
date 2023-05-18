import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AnimeCard from './AnimeCard'

function UserCard({
  img,
  email,
  userName,
  name,
  favoriteAnimes,
  favoriteVoiceActor,
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
          {favoriteVoiceActor && <ListGroup.Item>Favorite Voice Actor: {favoriteVoiceActor.name}</ListGroup.Item>}
        </ListGroup>
        {favoriteAnimes?.length &&
          favoriteAnimes.map((element) => {
            <Card.Body>
              <AnimeCard {...element} />
            </Card.Body>;
          })}
      </Card>
    </>
  );
}
  
  export default UserCard;


                  
                  
                  