import { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPIcons from '../../components/UPIcons/UPIcons';
import Subscribe from '../../components/UPSubscribe/Subscribe';

import UPTokenTable from '../../components/UPTokenTable/UPTokenTable';
import TripleCard from '../../components/UPTripleCard/TripleCard';
import { quickFilterConstants } from '../../helpers/constants';

import {
  filterTokensAction,
  getTokens,
  sortingTokensAction,
  sortTokenSortData,
  updateQuickFilterAction,
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
    quickFilter,
    updateQuickFilter,
    filterTokens,
  } = props;

  const [selectedSortType, setSelectedSortType] = useState('');
  const [selectedSortKey, setSelectedSortKey] = useState('');

  useEffect(() => {
    getTokensRequest();
  }, []);

  useEffect(() => {
    filterTokens();
    sortingTokens();
  }, [quickFilter]);

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
    <>
    <Container className="sales-tokens-container">
      <div className="mt-4">
        <Row>
          <div className="text-center text-fs-head-lg text-t-head-color">SALES</div>
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
      <Row id="tokens-container" className="d-flex align-items-center justify-content-between mt-4">
        <Col>
          <div id="token-sorting-section" className="d-flex align-items-center py-2">
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
        </Col>
        <Col className='text-md-end'>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton
              variant={quickFilter === quickFilterConstants.ALL ? 'primary' : 'light'}
              className={quickFilter !== quickFilterConstants.ALL ? 'text-t-body-color' : ''}
              id="tbg-radio-1"
              value={quickFilterConstants.ALL}
              onClick={() => updateQuickFilter(quickFilterConstants.ALL)}
            >
              All
            </ToggleButton>
            <ToggleButton
              variant={quickFilter === quickFilterConstants.ACTIVE ? 'primary' : 'light'}
              className={quickFilter !== quickFilterConstants.ACTIVE ? 'text-t-body-color' : ''}
              id="tbg-radio-2"
              value={quickFilterConstants.ACTIVE}
              onClick={() => updateQuickFilter(quickFilterConstants.ACTIVE)}
            >
              Active
            </ToggleButton>
            <ToggleButton
              variant={quickFilter === quickFilterConstants.COMPLETED ? 'primary' : 'light'}
              className={quickFilter !== quickFilterConstants.COMPLETED ? 'text-t-body-color' : ''}
              id="tbg-radio-3"
              value={quickFilterConstants.COMPLETED}
              onClick={() => updateQuickFilter(quickFilterConstants.COMPLETED)}
            >
              Completed
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

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
     
    </Container>
     <Subscribe />
     </>
  );
}
const mapStateToProps = (state) => {
  return {
    tokens: state.tokenReducer.tokens,
    filteredTokens: state.tokenReducer.filteredTokens,
    tokenSortData: state.tokenReducer.tokenSortData,
    quickFilter: state.tokenReducer.quickFilter,
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
    updateQuickFilter: (payload) => {
      dispatch(updateQuickFilterAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
