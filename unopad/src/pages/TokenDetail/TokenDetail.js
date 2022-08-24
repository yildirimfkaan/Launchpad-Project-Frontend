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
import BuyUnoToken from '../../components/BuyUnoToken';

function TokenDetail({ ...props }) {
  const { token, provider, accounts, ethereum, setWalletAccount, user } = props;
  const item = props.token;
  console.log('token inside', token);
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
  
  const connectWallet = async () => {
    wallet.connectWallet();

    // const req =
    //   'https://api-testnet.bscscan.com/api?module=account&action=txlist&address=' +
    //   accounts?.[0] +
    // eslint-disable-next-line max-len
    //   '&startblock=0&endblock=99999999&page=1&offset=10&sort=ascapikey=EZQIX4T8ZWUC2XJ7WT1Q24RQSGC6565S5N';
    // const res = await axios.get(req);

    // console.log('response', res);
  };

  // const handleNetwork = (e) => {
  //   const id = e.target.value;
  //   setNetwork(Number(id));
  // };
  // console.log('acc', accounts?.[0]);
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

  // const handleInput = (e) => {
  //   const msg = e.target.value;
  //   setMessage(msg);
  // };

  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: toHex(network) }],
  //     });
  //   } catch (switchError) {
  //     if (switchError.code === 4902) {
  //       try {
  //         await library.provider.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [networkParams[toHex(network)]],
  //         });
  //       } catch (error) {
  //         setError(error);
  //       }
  //     }
  //   }
  // };

  // const signMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const signature = await library.provider.request({
  //       method: 'personal_sign',
  //       params: [message, walletAccount],
  //     });
  //     setSignedMessage(message);
  //     setSignature(signature);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // const verifyMessage = async () => {
  //   if (!library) return;
  //   try {
  //     const verify = await library.provider.request({
  //       method: 'personal_ecRecover',
  //       params: [signedMessage, signature],
  //     });
  //     setVerified(verify === walletAccount.toLowerCase());
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

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

  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     // connectWallet();
  //   }
  // }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (newAccounts) => {
        // console.log('1', accounts?.[0]);
        // console.log('2', newAccounts?.[0]);
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
              {/* <Card.Img
                variant="top"
                src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/image'}
              /> */}
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
                    <Button variant="primary" onClick={stakeSetup}>
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
                <BuyUnoToken />
                
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
    // connectWalletRequest: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    setWalletAccount: (payload) => {
      dispatch(setWalletAccountData(payload));
    },
    getTokenByID: (payload) => {
      dispatch(getTokenByID(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenDetail);
