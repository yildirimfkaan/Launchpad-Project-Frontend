import React from 'react';
import TxList from './TxList';
export default function Transactions(Transfer_data) {
  
  const txs = Transfer_data[0];
  const err = Transfer_data[1]
  if (txs.length === 0) {
    return null     
} 
  return (
    <>
      <div
        className="m-4 credit-card w-full lg:w-3/4 sm:w-auto 
      shadow-lg mx-auto rounded-xl bg-white"
      >
        <div className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">Recent transactions</h1>
          
            <TxList txs={txs} err={err} />
          
        </div>
      </div>
    </>
  );
}
