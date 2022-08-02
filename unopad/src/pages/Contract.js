import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import erc20abi from '../helpers/abi';
import ErrorMessage from '../components/ErrorMessage';
import GetMyBalance from '../components/GetMyBalance';
// import Transfer from '../components/Transfer';
import BuyUnoToken from '../components/BuyUnoToken';
import Web3 from 'web3';

import { Col, Row } from 'react-bootstrap';
import Transactions from '../components/Transactions';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';
import store from '../store';
import { setLoadingAction } from '../store/loading/loadingActions';
// import * as loadingActionTypes from '../store/loading/loadingActionTypes';

function Contract({ ...props }) {
  const { balance_, signerAddress ,setLoading} = props;
  const [isLoadingtmp, setLoadingtmp] = useState(false);
  const [TransferStatus, TransferSetStatus] = useState(false);
  const [getMyBalanceStatus, setGetMyBalanceStatus] = useState(false);
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState({
    ErrorMessage,
  });
  const [contractInfo, setContractInfo] = useState({
    address: '-',
    tokenName: '-',
    tokenSymbol: '-',
    totalSupply: '-',
  });
  const [balanceInfo, setBalanceInfo] = useState({
    address: '-',
    balance: '-',
  });
  const [buyUnoTokenInfo, setBuyUnoTokenInfo] = useState({
    from: '-',
    to: '-',
    data: '-',
    value: '-',
    balance: '-',
  });

  useEffect(
    () => {
      if (contractInfo.address !== '-') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const erc20 = new ethers.Contract(contractInfo.address, erc20abi, provider);

        const web3 = new Web3(window.ethereum);
        const erc20_ = new web3.eth.Contract(erc20abi, contractInfo.address);
        erc20.on('Transfer', (from, to, amount, event) => {
          setTxs((currentTxs) => [
            ...currentTxs,
            {
              txHash: event.transactionHash,
              from,
              to,
              amount: String(amount),
            },
          ]);
        });
        setContractListened(erc20);
        if (isLoadingtmp) {
          setLoadingtmp(false);
          setGetMyBalanceStatus(true);
        }
        return () => {
          contractListened.removeAllListeners();
        };
      }
    },
    [contractInfo.address],
    [isLoadingtmp],
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingtmp(true);
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract(data.get('addr'), erc20abi, provider);
    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    const web3 = new Web3(window.ethereum);
    const erc20_ = new web3.eth.Contract(erc20abi, data.get('addr'));

    let overrides = {
      // The maximum units of gas for the transaction to use
      gasLimit: 23000,
      // The price (in wei) per unit of gas
      gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),
      // The amount to send with the transaction (i.e. msg.value)
      value: ethers.utils.parseEther('0.1'),
      // The chain ID (or network ID) to use
    };
    const tokenName_ = await erc20_.methods.name().call();
    const tokenSymbol_ = await erc20_.methods.symbol().call();
    const totalSupply_ = await erc20_.methods.totalSupply().call();

    setContractInfo({
      address: data.get('addr'),
      tokenName: tokenName_,
      tokenSymbol: tokenSymbol_,
      totalSupply: totalSupply_,
    });
  };
  const buyUnoToken = async (e) => {
    e.preventDefault();
    setLoadingtmp(
      // {key:loadingActionTypes.BUY_UNOTOKEN_LOADING,isLoading:true}
      true);
    const data = new FormData(e.target);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const erc20_ = new web3.eth.Contract(erc20abi, contractInfo.address);

    const etherMiktari = data.get('etherValue');
    console.log('ether miktar', etherMiktari);
    try {
      await erc20_.methods.buyToken().send({
        from: signerAddress,
        to: contractInfo.address,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, 'ether'),
      });
    } catch (err) {
      console.log('error message');
      console.log(err);
    }
    setLoadingtmp(
      // {key:loadingActionTypes.BUY_UNOTOKEN_LOADING,isLoading:false}
     false );
    const balance_ = await erc20_.methods.balanceOf(signerAddress).call();
    setBuyUnoTokenInfo({
      from: signerAddress,
      to: contractInfo.address,
      data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
      value: web3.utils.toWei('0.01', 'ether'),
      balance: balance_,
    });
    getMyBalance();
  };
  const getMyBalance = async () => {
    wallet.getMyBalance(contractInfo.address);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    // const signer = await provider.getSigner();
    // const signerAddress = await signer.getAddress();
    console.log('signer address contract page', store.getState().walletReducer.signerAddress);
    console.log('wallet balance :', store.getState().walletReducer.balance_);
    // const web3 = new Web3(window.ethereum);
    // await window.ethereum.enable();
    // const erc20_ = new web3.eth.Contract(erc20abi, contractInfo.address );
    // const balance_ = await erc20_.methods.balanceOf(signerAddress).call();
    // setLoading(false);
    TransferSetStatus(true);
    // setBalanceInfo({
    //   address: store.getState().walletReducer.signerAddress,
    //   balance: String(wallet.getMyBalance.balance_)
    // });
  };
  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
    await erc20.transfer(data.get('recipient'), data.get('amount'));
  };

  const Transfer_data = [handleTransfer, txs];
  const buyUnoToken_data = [buyUnoToken, buyUnoTokenInfo, isLoadingtmp];
  return (
    <div style={{ width: '100%' }}>
      <Col>
        <form className="m-4" onSubmit={handleSubmit}>
          <div
            className="credit-card w-full lg:w-3/4 sm:w-auto 
          shadow-lg mx-auto rounded-xl bg-white"
          >
            <main className="mt-4 p-4">
              <h1 className="text-xl font-semibold text-gray-700 text-center">
                Read from smart contract
              </h1>
              <div className="">
                <div className="my-3">
                  <input
                    type="text"
                    name="addr"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="ERC20 contract address"
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                disabled={isLoadingtmp}
              >
                {isLoadingtmp ? 'Loading…' : 'Get Token Info'}
              </button>
            </footer>
            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Total supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{contractInfo.tokenName}</th>
                      <td>{contractInfo.tokenSymbol}</td>
                      <td>{String(contractInfo.totalSupply)}</td>
                      <td>{contractInfo.deployedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {getMyBalanceStatus ? (
              <GetMyBalance getMyBalance={getMyBalance} {...props} />
            ) : (
              <div> </div>
            )}
          </div>
        </form>
      </Col>
      <Row>
        <Col>
          {TransferStatus ? <BuyUnoToken {...buyUnoToken_data} /> : <div> </div>}
          {TransferStatus ? <Transactions {...Transfer_data} /> : <div> </div>}
          {/* {TransferStatus ?  <TxList {...txs}/>:<div> </div>} */}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    provider2: state.walletReducer.provider2,
    signer: state.walletReducer.signer,
    signerAddress: state.walletReducer.signerAddress,
    web3: state.walletReducer.web3,
    erc20_: state.walletReducer.erc20_,
    balance_: state.walletReducer.balance_,
    contractAddress: state.walletReducer.contractAddress,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (payload) => {
      dispatch(setLoadingAction(payload));
    },

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Contract);
