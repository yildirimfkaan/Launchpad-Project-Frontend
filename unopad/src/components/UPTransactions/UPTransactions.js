import React from 'react';
import UPTxList from '../UPTxList/UPTxList';
import './UPTransactions.scss';

export default function Transactions(Transfer_data) {
  const txs = Transfer_data[0];
  const err = Transfer_data[1];
  if (txs.length === 0) {
    return null;
  }
  return (
    <>
      <div
        className="bg-white"
      >
        <div className="p-4">
          <h1 className="text-fs-head-md
           font-semibold text-gray-700 text-center">Recent transactions</h1>

          <UPTxList txs={txs} err={err} />
        </div>
      </div>
    </>
  );
}
