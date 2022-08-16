import React from 'react';
import { connect } from 'react-redux';

import unopad_token from '../helpers/unopad_token';
import unopad_presale from '../helpers/unopad_presale';
import Web3 from 'web3';
import { ethers } from 'ethers';

function buyUnoToken({...props }) {
  const { balance_, signerAddress, token} = props;

  
  console.log("kadir-token",token)
  // buyUnoToken_data
  // const buyUnoToken = buyUnoToken_data[0];
  // const buyUnoTokenInfo = buyUnoToken_data[1];
  // const isLoadingtmp = buyUnoToken_data[2];

  const buyToken = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contractUnoToken = '0x012b020b2479f42835fafd7037339b5bdba4c3fb';
    const contractUnoTokenPresale = '0x7e851d4f813c4508e80fb54cc51f7066d54ffefa';

    const unopad_token_abi = new web3.eth.Contract(unopad_token, contractUnoToken);
    console.log("unopad_token_abi",unopad_token_abi);

    const unopad_presale_abi = new web3.eth.Contract(unopad_presale, contractUnoTokenPresale);
    console.log("unopad_presale_abi",unopad_presale_abi);

    const etherMiktari = data.get('etherValue');
    console.log('ether miktar', etherMiktari);
    try {
      await unopad_presale_abi.methods.buy().send( {
          
        from: signerAddress,
        to: contractUnoTokenPresale,
        data: web3.eth.abi.encodeFunctionSignature('whitdrawETH()'),
        value: web3.utils.toWei(etherMiktari, "ether")

      });
    } catch (err) {
      console.log('error message');
      console.log(err);
    }

  };

  return (
    <>
      <form className="m-4" onSubmit={buyToken}>
        <div
          className="credit-card w-full lg:w-3/4 sm:w-auto 
        shadow-lg mx-auto rounded-xl bg-white"
        >
          <main className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Buy Uno Token</h1>
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
              // disabled={isLoadingtmp}
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

                    <th>Total Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{token.token_address}</td>

                    <td>{token.token_total_supply}</td>
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
    token: state.tokenReducer.token,
  };
};

export default connect(mapStateToProps)(buyUnoToken);