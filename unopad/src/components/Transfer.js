import React from 'react';
import TxList from './TxList';
export default function Transfer(Transfer_data) {
  const handleTransfer = Transfer_data[0];
  const txs = Transfer_data[1];
  return (
    <>
      <div
        className="m-4 credit-card w-full lg:w-3/4 sm:w-auto 
      shadow-lg mx-auto rounded-xl bg-white"
      >
        <div className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">Write to contract</h1>

          <form onSubmit={handleTransfer}>
            <div className="my-3">
              <input
                type="text"
                name="recipient"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient address"
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                name="amount"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount to transfer"
              />
            </div>
            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              >
                Transfer
              </button>
            </footer>
          </form>
        </div>
      </div>
      <div
        className="m-4 credit-card w-full lg:w-3/4 sm:w-auto 
      shadow-lg mx-auto rounded-xl bg-white"
      >
        <div className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">Recent transactions</h1>
          <p>
            <TxList txs={txs} />
          </p>
        </div>
      </div>
    </>
  );
}
