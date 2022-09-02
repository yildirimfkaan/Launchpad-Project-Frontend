import React, { useState } from 'react';
import { getTokenByID } from '../../store/token/tokenActions';
// import { getProjectByID } from '../../store/project/projectActions';

import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setWalletAccountData } from '../../store/wallet/walletActions';
import { Button, Card, Container } from 'react-bootstrap';
import { checkAllConditionForStake } from '../../helpers/verificationHelper';
// import Contract from '../Contract';
import wallet from '../../helpers/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import './TokenDetail.scss';
import UPBuyTokenModal from '../../components/UPBuyTokenModal/UPBuyTokenModal';
import { buyTokenModalAction } from '../../store/token/tokenActions';

function TokenDetail({ ...props }) {
  const { token, provider, accounts, ethereum, setWalletAccount, user, buyTokenModalRequest } =
    props;
  const item = props.token;
  const [stake, setStake] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  const tokenAddress = '0x012b020b2479f42835FAFd7037339B5bDBa4C3Fb';
  const tokenSymbol = 'UNOT';
  const tokenDecimals = 4;
  const stakeSetup = () => {
    setStake(true);
  };
  const handleShow = () => {
    buyTokenModalRequest(true);
  };

  const connectWallet = async () => {
    wallet.connectWallet();
  };

  
  const addUnoTokenFunction = async () => {
    try {
      const provider = await detectEthereumProvider();
      const wasAdded = await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
          },
        },
      });
      console.log(wasAdded);

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('UnoToken has not been added');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  const refreshState = () => {
    // setWalletAccount(null);
    setChainId();
    // setNetwork('');
    setMessage('');
    setSignature('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    wallet.disconnectWallet();
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (newAccounts) => {
        if (accounts?.[0] !== newAccounts?.[0]) setWalletAccount(newAccounts);
      };
      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    const payload = {
      id: props.match.params.id,
    };
    props.getTokenByID(payload);

    return () => {};
  }, []);

  return (
    <>
      {!token ? (
        <h1>Page is Loading.....</h1>
      ) : (
        <>
          <Container>
            <Card className="token-detail-card mx-auto">
             
              <Card.Header>
                <div className="token-detail-name-div">
                  <Card.Text>{item.token_name}</Card.Text>
                  <Card.Title>{item.token_symbol}</Card.Title>
                </div>

                <div className="token-detail-price-div">
                  <Card.Text>PRICE</Card.Text>
                  <Card.Title>${item.token_price_in_usd}</Card.Title>
                  <Card.Title>{item.token_price_in_uno} UNO</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="token-detail-name-div">
                  <Card.Text>TOTAL RAISED</Card.Text>
                  <Card.Title>$0/${item.token_total_raise}</Card.Title>
                </div>

                <div className="token-detail-price-div">
                  <Card.Text>TOKEN DISTRIBUTION</Card.Text>
                  <Card.Title>{item.token_distribution}</Card.Title>
                </div>

                <span>{error ? error.message : null}</span>
              </Card.Body>
              <Card.Footer>
                <div className="token-detail-footer-left-div">
                  {checkAllConditionForStake(user, accounts) ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        stakeSetup();
                        handleShow();
                      }}
                    >
                      Buy Now !
                    </Button>
                  ) : (
                    <Button variant="primary" disabled={true}>
                      Buy Now !
                    </Button>
                  )}
                </div>
                <div className="token-detail-footer-right-div">
                  <Button variant="primary" onClick={addUnoTokenFunction}>
                    Add UnoToken{' '}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
            {checkAllConditionForStake(user, accounts) && stake ? (
              <>
                <UPBuyTokenModal />
              </>
            ) : (
              <div></div>
            )}
          </Container>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    provider: state.walletReducer.provider,
    ethereum: state.walletReducer.ethereum,
    accounts: state.walletReducer.accounts,
    user: state.userReducer.user,
    token: state.tokenReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setWalletAccount: (payload) => {
      dispatch(setWalletAccountData(payload));
    },
    getTokenByID: (payload) => {
      dispatch(getTokenByID(payload));
    },
    buyTokenModalRequest: (payload) => {
      dispatch(buyTokenModalAction(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenDetail);
