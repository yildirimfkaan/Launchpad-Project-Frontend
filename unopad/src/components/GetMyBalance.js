import React from 'react';
import { connect } from 'react-redux';
import * as loadingActionTypes from '../store/loading/loadingActionTypes';
// import wallet from '../helpers/wallet';

function GetMyBalance({...props}) {
  const {balance_,signerAddress,isLoading,getMyBalance} = props;

  return (
    <>
      <div className="p-4">
        <button
          onClick={getMyBalance}
          type="submit"
          className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          disabled={isLoading?.[loadingActionTypes.GET_MY_BALANCE_LOADING]}
        >
          {isLoading?.[loadingActionTypes.GET_MY_BALANCE_LOADING] ? 'Loading…' : 'Get My Balance'}
        </button>
      </div>
      <div className="px-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Address</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{signerAddress}</th>
                <td>{balance_}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoading:state.loadingReducer.isLoading,
  };
};
export default connect(mapStateToProps)(GetMyBalance);