import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CommentCard({
  title,
  comment,
  addedBy
}) {
  return (
    <>
      <Card style={{ width: "18rem" }}>

        <Card.Body>
        <Card.Title>{title}</Card.Title>
        {comment}
        </Card.Body>
        
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Added By: {addedBy.userName}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}
  
  export default CommentCard;