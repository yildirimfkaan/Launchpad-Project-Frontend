/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import Contract from './Contract';
// import { networkParams } from '../helpers/web3modal/networks';
// import { toHex } from '../helpers/web3modal/utils';
// import { ethers } from 'ethers';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';
import { setWalletAccountData } from '../store/wallet/walletActions';
// import {connectWallet} from '../store/wallet/walletActions'
import wallet from '../helpers/wallet';
import axios from 'axios';

function NewContract({ ...props }) {
  const {
    provider,
    library,
    network,
    accounts,
    connectWalletRequest,
    setWalletAccount,
    web3Modal,
  } = props;
  const item = props.project;
  console.log('acc', accounts);
  console.log('library', library);
  console.log('network', network);
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
    console.log('acc', accounts?.[0]);
    console.log('library', library?.[0]);
    console.log('network', network?.[0]);
    console.log('provider', provider);
    // const block_ac = await library?.[0].getBlock();
    // console.log('block_ac', block_ac.number);
    // const block_start = await library?.[0].getBlock(20385297);
    // const block_end = await library?.[0].getBlock('latest');
    // console.log('block_start', block_start?.[0].number);
    // console.log('block_end', block_end.number);

    // console.log('block_start', block_start);
    const req =
      'https://api-testnet.bscscan.com/api?module=account&action=txlist&address=' +
      accounts?.[0] +
      '&startblock=0&endblock=99999999&page=1&offset=10&sort=ascapikey=EZQIX4T8ZWUC2XJ7WT1Q24RQSGC6565S5N';
    const res = await axios.get(req);

    console.log('response', res);

    // try {
    //   const provider = await web3Modal.connect();
    //   console.log("nw provider",provider)
    //   const library = new ethers.providers.Web3Provider(provider);
    //   const accounts = await library.listAccounts();
    //   const network = await library.getNetwork();
    //   setProvider(provider);
    //   setLibrary(library);
    //   if (accounts) setWalletAccount(accounts[0])
    //   setChainId(network.chainId);
    // } catch (error) {
    //   setError(error);
    // }
  };

  // const handleNetwork = (e) => {
  //   const id = e.target.value;
  //   setNetwork(Number(id));
  // };
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

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      // connectWallet();
    }
  }, []);

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
  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={process.env.REACT_APP_API_URL + '/projects/' + item.id + '/image'}
              />
              <Card.Body>
                <Card.Title>{item.project_name}</Card.Title>
                <Card.Text>{item.project_sale_type}</Card.Text>
                <div>
                  {!accounts?.[0] ? (
                    <Button variant="primary" onClick={connectWallet}>
                      Stake Now !
                    </Button>
                  ) : (
                    <Button onClick={disconnect}>Disconnect</Button>
                  )}
                  <Button variant="primary" onClick={addUnoTokenFunction}>
                    Import UnoToken{' '}
                  </Button>
                </div>
                <span>{error ? error.message : null}</span>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            {accounts?.[0] && (
              <div>
                <Contract />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    web3Modal: state.walletReducer.web3Modal,
    provider: state.walletReducer.provider,
    library: state.walletReducer.library,
    network: state.walletReducer.network,
    accounts: state.walletReducer.accounts,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewContract);
