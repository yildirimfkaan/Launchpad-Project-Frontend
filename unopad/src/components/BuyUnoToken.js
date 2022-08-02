import React from 'react';

export default function buyUnoToken(buyUnoToken_data) {
  const buyUnoToken = buyUnoToken_data[0];
  const buyUnoTokenInfo = buyUnoToken_data[1];
  const isLoadingtmp = buyUnoToken_data[2];

  return (
    <>
      <form className="m-4" onSubmit={buyUnoToken}>
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
              disabled={isLoadingtmp}
            >
              {isLoadingtmp ? 'Loading…' : 'Buy Uno Token'}
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
                    <th>{buyUnoTokenInfo.from}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>To</th>

                    <th>Token Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{buyUnoTokenInfo.to}</td>

                    <td>{buyUnoTokenInfo.balance}</td>
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
