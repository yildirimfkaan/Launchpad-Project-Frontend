import { useEffect, useState } from 'react';
import { Container, Dropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPIcons from '../../components/UPIcons/UPIcons';
import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import UPTokenTable from '../../components/UPTokenTable/UPTokenTable';
import TripleCard from '../../components/UPTripleCard/TripleCard';
import { quickHandlerImages } from '../../helpers/quickHandlerImages';
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
    filteredTokens,
    tokens,
    tokenSortData,
    getTokensRequest,
    filterTokens,
    setSortData,
    sortingTokens,
  } = props;

  const [filterInput, setFilterInput] = useState('');
  const [selectedSortType, setSelectedSortType] = useState('');
  const [selectedSortKey, setSelectedSortKey] = useState('');

  useEffect(() => {
    getTokensRequest();
  }, []);

  useEffect(() => {
    filterTokens(filterInput);
    sortingTokens();
  }, [filterInput]);

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
      <UPQuickHandler
        className="justify-content-center"
        isSignUpAndKYC={true}
        signUpAndKYCImg={quickHandlerImages.salesSignUpAndKYCImg}
        isVerifyWallet={true}
        verifyWalletImg={quickHandlerImages.salesVerifyWalletImg}
        isStakingUnoToken={false}
        registerForSaleImg={quickHandlerImages.salesRegisterForSale}
        href="#sales-table"
        history={props.history}
      />
      <div id="token-filter-section" className="py-2">
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="Search by token name, token symbol or token address..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <h3>Sales</h3>
      <div id="token-sorting-section" className="d-flex align-items-center py-2">
        <Dropdown className="me-2">
          <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center">
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
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center">
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
      <TripleCard/>
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
