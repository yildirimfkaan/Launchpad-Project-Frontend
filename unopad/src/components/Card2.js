import {Container, Card, Row, Button, NavLink} from "react-bootstrap";

export default function Card2( data_detail ) {
    const item = data_detail
  
     return(
       <>
      <Container>
      <Row>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={"http://127.0.0.1/api/projects/" + item.id + "/image"} />
        <Card.Body>
        <Card.Title>{item.project_name}</Card.Title>
        <Card.Text>
        {item.project_sale_type}
        </Card.Text>
        <NavLink href={"/project/"+item.id}><Button variant="primary">Stake Now</Button></NavLink>
        </Card.Body>
      </Card>
      </Row>
      </Container>
       </>
     );

  
}
