import { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPIcons from '../../components/UPIcons/UPIcons';
import Subscribe from '../../components/UPSubscribe/Subscribe';

import UPTokenTable from '../../components/UPTokenTable/UPTokenTable';
import TripleCard from '../../components/UPTripleCard/TripleCard';

import {
  filterTokensAction,
  getTokens,
  sortingTokensAction,
  sortTokenSortData,
} from '../../store/token/tokenActions';
import './Sales.scss';
import { sortKeys, sortTypes } from './salesConstants';

function Sales({ ...props }) {
  const {
    tokens,
    tokenSortData,
    getTokensRequest,
    setSortData,
    sortingTokens,
  } = props;

  const [selectedSortType, setSelectedSortType] = useState('');
  const [selectedSortKey, setSelectedSortKey] = useState('');

  useEffect(() => {
    getTokensRequest();
  }, []);


  function changeSortType(sortType) {
    const newTokenSortData = { ...tokenSortData, sortType };
    setSortData(newTokenSortData);
    sortingTokens();
  }

  function changeSortKey(sortKey) {
    const newTokenSortData = { ...tokenSortData, sortKey };
    setSortData(newTokenSortData);
    sortingTokens();
  }

  return (
    <Container className="sales-tokens-container">


      <div className='mt-4'>
        <Row>
          <div className="text-center text-fs-head-lg text-t-head-color">COMPLETED SALES</div>
        </Row>
        <Row>
          <Col></Col>
          <Col lg={6}>
            <div className="text-center text-fs-body-md text-t-head-color">
              Leverage on any tokens with a protocol trusted with billions for its performance and
              reliability.
            </div>
          </Col>
          <Col></Col>
        </Row>
      </div>

      <div id="token-sorting-section" className="d-flex align-items-center py-2 mt-4">
        <Dropdown className="me-2 sales-table-button">
          <Dropdown.Toggle className="d-flex align-items-center">
            <UPIcons name="MdSort" size="18" />
            <span className="ms-1">{sortTypes[tokenSortData.sortType].name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="py-1">
            {sortTypes.map((sortType, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  className="d-flex align-items-center px-1"
                  onClick={() => changeSortType(index)}
                >
                  <UPIcons name={sortType.icon} size="18" />
                  <span className="ms-2">{sortType.name}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="sales-table-button">
          <Dropdown.Toggle className="d-flex align-items-center">
            <UPIcons name="BiFilterAlt" size="18" />
            <span className="ms-1">{sortKeys[tokenSortData.sortKey].name}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="py-1">
            {sortKeys.map((sortKey, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  className="d-flex align-items-center px-1"
                  onClick={() => changeSortKey(index)}
                >
                  <span>{sortKey.name}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div id="sales-table" className="mt-2">
        {tokens && (
          <>
            <UPTokenTable {...props} />
          </>
        )}
      </div>
      <TripleCard />
      <br></br>
      <br></br>
      <Subscribe />
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    tokens: state.tokenReducer.tokens,
    filteredTokens: state.tokenReducer.filteredTokens,
    tokenSortData: state.tokenReducer.tokenSortData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTokensRequest: (payload) => {
      dispatch(getTokens(payload));
    },
    filterTokens: (payload) => {
      dispatch(filterTokensAction(payload));
    },
    setSortData: (payload) => {
      dispatch(sortTokenSortData(payload));
    },
    sortingTokens: (payload) => {
      dispatch(sortingTokensAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
