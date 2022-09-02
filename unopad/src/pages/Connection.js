import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import wallet from '../helpers/wallet';
// import store from '../store';
import { connect } from 'react-redux';
import wallet from '../helpers/wallet';

function Connection({...props}) {
  const {ethereum,provider,accounts} = props;
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  
  useEffect(() => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
  }, [ethereum]);
  

  const connectWallet = async () => {
    try {
     wallet.connectWallet()
     
    
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      
      setIsConnected(true);
      
    } 
    
    catch (error) {
      setIsConnected(false);
    }
  };
  
  useEffect(() => {
   
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);
  const disconnectWallet = async () => {
        wallet.disconnectWallet()
        
        setIsConnected(false);
        

  }

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <img className="App-logo" alt="logo" />
            )}
            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
              {!isConnected ? (
              <p className="info">🎉 Status : Disconnect</p>
            ) : (
              <button className="btn" onClick={disconnectWallet}>
                Disconnect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}
const mapStateToProps = (state) => {
    return {
      provider: state.walletReducer.provider,
      accounts: state.walletReducer.accounts,
      ethereum: state.walletReducer.ethereum,
    };
  };


export default connect(mapStateToProps) (Connection);