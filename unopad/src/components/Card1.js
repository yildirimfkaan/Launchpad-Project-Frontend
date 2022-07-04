import {Container, Card, Row, Button, NavLink} from "react-bootstrap";

export default function Card1( avalaunch_api_data ) {
    
    
     return(
      <Container>
      <Row>
      {Object.entries(avalaunch_api_data).map((item, index) => (
      <Card style={{ width: '18rem', margin:'5px'}} >
        <Card.Img variant="top" src={"http://127.0.0.1/api/projects/" + item[1].id + "/image"} />
        
        <Card.Body>
        <Card.Title>{item[1].project_name}</Card.Title>
        <Card.Text>
        {item[1].project_sale_type}
        </Card.Text>
        <NavLink href={"/project/"+item[1].id}><Button style={{backgroundColor: "#365ae1",marginLeft:"10px",marginTop:"10px"}}>Go to Details</Button></NavLink>
        </Card.Body>
      </Card>
      ))}
      </Row>
      </Container>
     );

  
}
