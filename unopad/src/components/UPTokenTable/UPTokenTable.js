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

  console.log(tokens);

  return (
    <Table className='sales-table-design' responsive hover borderless>
      <thead>
        <tr className="text-t-body-color text-fs-tag">
          <th>#</th>
          <th>Project Name</th>
          <th>IDO Token Price</th>
          <th>Current Price</th>
          <th>ATH</th>
          <th>ATH IDO ROI</th>
          <th>No. Registration</th>
          <th>Total Raised</th>
          <th>Total Tokens Sold</th>
          <th>Sale Ended At</th>
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
                className="text-t-head-color"
              >
                <td>{index + 1}</td>
                <td>
                    {item[1].token_name}
                </td>
                <td>{item[1].token_symbol}</td>
                <td>text</td>
                <td>text</td>
                <td>text</td>
                <td>text</td>
                <td>text</td>
                <td>text</td>
                <td>text</td>
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
