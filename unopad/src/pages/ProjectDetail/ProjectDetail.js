import React, { useState } from 'react';
import { getProjectByID } from '../../store/project/projectActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setWalletAccountData } from '../../store/wallet/walletActions';
import { Button, Card, Container } from 'react-bootstrap';
import { checkAllConditionForStake } from '../../helpers/verificationHelper';
import Contract from '../Contract';
import wallet from '../../helpers/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import './ProjectDetail.scss';

function ProjectDetail({ ...props }) {
  const { project, provider, accounts, ethereum, setWalletAccount, user } = props;
  const item = props.project;
  console.log('projeler', project);

  console.log('acc', accounts);
  console.log('condition', checkAllConditionForStake(user, accounts));

  console.log('provider', provider);

  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  const tokenAddress = '0x21B0BD8D4FC7Bb4475f4FBb7BF692005A0365218';
  const tokenSymbol = 'UNPTest';
  const tokenDecimals = 0;

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
  console.log('acc', accounts?.[0]);
  console.log('ethereum', ethereum);
  console.log('provider', provider);
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
    console.log('before if');
    if (provider?.on) {
      const handleAccountsChanged = (newAccounts) => {
        console.log('1', accounts?.[0]);
        console.log('2', newAccounts?.[0]);
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
  console.log('new contract wallet acc:', accounts?.[0]);

  useEffect(() => {
    const payload = {
      id: props.match.params.id,
    };
    props.getProjectByID(payload);

    return () => {};
  }, []);

  return (
    <>
      {!project ? (
        <h1>Page is Loading.....</h1>
      ) : (
        <>
          <Container>
            <Card className="project-detail-card mx-auto">
              <Card.Img
                variant="top"
                src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/image'}
              />
              <Card.Body>
                <Card.Title>{item.project_name}</Card.Title>
                <Card.Text>{item.project_sale_type}</Card.Text>
                <div>
                  {checkAllConditionForStake(user, accounts) ? (
                    <Button variant="primary" onClick={connectWallet}>
                      Stake Now !
                    </Button>
                  ) : (
                    <Button variant="primary" disabled={true}>
                      Stake Now !
                    </Button>
                  )}
                  <Button variant="primary" onClick={addUnoTokenFunction}>
                    Import UnoToken{' '}
                  </Button>
                </div>
                <span>{error ? error.message : null}</span>
              </Card.Body>
            </Card>

            {checkAllConditionForStake(user, accounts) && (
              <div>
                <Contract />
              </div>
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
    project: state.projectReducer.project,
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
    getProjectByID: (payload) => {
      dispatch(getProjectByID(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
