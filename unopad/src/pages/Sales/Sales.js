import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import UPQuickHandler from '../../components/UPQuickHandler/UPQuickHandler';
import UPTokenTable from '../../components/UPTokenTable/UPTokenTable';
import { getTokens } from '../../store/token/tokenActions';
import './Sales.scss';

function Sales({ ...props }) {
  const { tokens, getTokensRequest } = props;
  useEffect(() => {
    getTokensRequest();
  }, []);

  return (
    <Container className="sales-tokens-container">
      <div
        className="sales-banner mt-2 border d-flex 
      align-items-center justify-content-center text-muted h5"
      >
        Banner
      </div>
      <UPQuickHandler
        isSignUpAndKYC={true}
        isVerifyWallet={true}
        isStakingUnoToken={false}
        href="#sales-table"
      />
      <div id="sales-table" className="mt-2">
        {tokens && (
          <>
            <UPTokenTable {...props} />
          </>
        )}
      </div>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    tokens: state.tokenReducer.tokens,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTokensRequest: (payload) => {
      dispatch(getTokens(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
