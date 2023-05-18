import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage() {
    return (
      <div className = "HomePage">
      <Card style={{ width: "70vw"}}>
      <Card.Title>Anime Watchlist</Card.Title>
      <ListGroup className="list-group-flush">
          <ListGroup.Item>"Forgetting is like a wound. The wound may heal, but it has already left a scar." 
          -Monkey D. Luffy</ListGroup.Item>
          <ListGroup.Item>"Sometimes, we have to look beyond what we want and do what's best." 
          -Piccolo</ListGroup.Item>
          <ListGroup.Item>"No matter how hard or impossible it is, never lose sight of your goal." 
          -Monkey D. Luffy</ListGroup.Item>
          <ListGroup.Item>"Human strength lies in the ability to change yourself." 
          -Saitama</ListGroup.Item>
          <ListGroup.Item>“If you don't take risks, you can't create a future!” 
          -Monkey D. Luffy</ListGroup.Item>
      </ListGroup>
      </Card>
      </div>
    );
  }
   
export default HomePage;