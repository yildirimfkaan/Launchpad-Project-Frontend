import React from "react";

export default function GetMyBalance(getMyBalance_data) {
   const getMyBalance = getMyBalance_data[0]
   const balanceInfo = getMyBalance_data[1]
   const isLoading = getMyBalance_data[2]
   
   return(
       <>
   
   <div className="p-4">
              <button
                onClick={getMyBalance}
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                disabled={isLoading}
              >
                    {isLoading ? 'Loading…' : 'Get My Balance'}
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
                      <th>{balanceInfo.address}</th>
                      <td>{balanceInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
    </div>
   </>
   )
    
    
}

