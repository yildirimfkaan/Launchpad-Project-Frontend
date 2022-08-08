import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UPProjectTable.scss';

function UPProjectTable(props) {
  const { projects } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Project Name</th>
          <th>Sale Type</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(projects).map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className='mr-2'>
                    <img
                      alt="img-project-table"
                      className="responsive"
                      height={40}
                      src={process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/image'}
                    />
                  </span>
                  <span>{item[1].project_name}</span>
                </div>
              </td>
              <td>{item[1].project_sale_type}</td>
              <td>
                <Link to={'/project/' + item[1].id}>Go detail</Link>
              </td>
            </tr>
          );
        })} 
        
      </tbody>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projectReducer.projects,
  };
};

export default connect(mapStateToProps)(UPProjectTable);
