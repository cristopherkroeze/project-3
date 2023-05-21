import Card from 'react-bootstrap/Card';

function CharacterCard({
  mainCharacter
}) {
    const img = mainCharacter.img
    const name = mainCharacter.name
    const voicedBy = mainCharacter.voicedBy
  return (
    <>
      <Card style={{ width: "35vw" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
        <Card.Title>
        Main Character: {name}
        </Card.Title>
        Voiced By (Japanese): {voicedBy}
        </Card.Body>
      </Card>
    </>
  );
}
  
  export default CharacterCard;
