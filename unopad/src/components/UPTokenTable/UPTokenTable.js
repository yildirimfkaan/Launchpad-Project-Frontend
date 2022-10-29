import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import './UPTokenTable.scss';

function UPTokenTable(props) {
  const tokens = props.filteredTokens?.length ? props.filteredTokens : props.tokens;
  const { history } = props;

  const TableSelectRow = (nums) => {
    return history.push('token/' + nums);
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Token Name</th>
          <th>Token Symbol</th>
          <th>Token Address</th>
        </tr>
      </thead>
      <tbody>
        {tokens?.length ? (
          Object.entries(tokens).map((item, index) => {
            return (
              <tr
                onClick={() => {
                  TableSelectRow(item[1].id);
                }}
              >
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    {/* <span className="mr-2">
                    <img
                      alt="img-project-table"
                      height={30}
                      width={30}
                      src={process.env.REACT_APP_API_URL + '/projects/' + item[1].id + '/image'}
                    />
                  </span> */}
                    <div>{item[1].token_name}</div>
                  </div>
                </td>
                <td>{item[1].token_symbol}</td>
                <td>{item[1].token_address}</td>
                {/* <td>
                <Link to={'/token/' + item[1].id}>Go detail</Link>
              </td> */}
              </tr>
            );
          })
        ) : (
          <div className="text-muted">No token found according to search results.</div>
        )}
      </tbody>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    tokens: state.tokenReducer.tokens,
  };
};

export default connect(mapStateToProps)(UPTokenTable);
