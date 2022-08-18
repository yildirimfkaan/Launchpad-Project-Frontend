import React from 'react';
import { connect } from 'react-redux';

import dynamic_presale from '../helpers/dynamic_presale';
import dynamic_token from '../helpers/dynamic_token';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { setLoadingAction } from '../store/loading/loadingActions';
import * as loadingActionTypes from '../store/loading/loadingActionTypes';
import wallet from '../helpers/wallet';

function SwapToken({...props }) {
  const { balance_, signerAddress, project, setLoading,isLoading} = props;
  const contractDynamicToken = '0xa4f07529ce9119ab60d4da69fb8cc28ea6bc6f25';
  const contractDynamicTokenPresale = '0x1000c894980884a38516884804e7418c654b9f85';
 
  const swapToken = async (e) => {
    e.preventDefault();
    console.log("set loading func set")
    console.log("load2",isLoading)
    setLoading({key:loadingActionTypes.SWAP_TOKEN_LOADING,isLoading:true})
    const data = new FormData(e.target);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

   
    console.log("pra",project)

    const dynamic_token_abi = new web3.eth.Contract(dynamic_token, contractDynamicToken);
    console.log("dynamic_token_abi",dynamic_token_abi);

    const dynamic_presale_abi = new web3.eth.Contract(dynamic_presale, contractDynamicTokenPresale);
    console.log("dynamic_presale_abi",dynamic_presale_abi);


    const etherMiktari = data.get('etherValue');
    console.log('ether miktar', etherMiktari);
    try {
        await dynamic_presale_abi.methods.swap().send( {
          
        from: signerAddress,
        to: contractDynamicTokenPresale,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, "ether")

      });
      wallet.getMyBalance(contractDynamicToken)
      setLoading({key:loadingActionTypes.SWAP_TOKEN_LOADING,isLoading:false})
    } catch (err) {
      console.log('error message');
      console.log(err);
    }

  };

  return (
    <>
      <form className="m-4" onSubmit={swapToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
        shadow-lg mx-auto rounded-xl bg-white"
        >
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Buy Token</h1>
            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  name="etherValue"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Ether Value"
                />
              </div>
            </div>
          </main>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              disabled={isLoading?.[loadingActionTypes.SWAP_TOKEN_LOADING]}
            >
              Buy Token
            </button>
          </footer>
          <div className="px-4">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{signerAddress}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>To</th>
                    {/* <th>Dynamic Token Balance</th> */}
                    <th>Token Total Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{contractDynamicTokenPresale}</td>

                    <td>{project.project_token.token_total_supply}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
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
    project:state.projectReducer.project,
    isLoading:state.loadingReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (payload) => {
      dispatch(setLoadingAction(payload));
    },

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SwapToken);