import { Card, Button, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Card1(props) {
  const { projects } = props;
  return (
    <>
      {Object.entries(projects).map((item, index) => (
        <Card style={{ width: '18rem', margin: '5px' }}>
          <Card.Img
            variant="top"
            src={process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/image'}
          />

          <Card.Body>
            <Card.Title>{item[1].project_name}</Card.Title>
            <Card.Text>{item[1].project_sale_type}</Card.Text>
            <NavLink as={Link} to={'/project/' + item[1].id}>
              <Button className="me-2 mt-2">
                Go to Details
              </Button>
            </NavLink>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
