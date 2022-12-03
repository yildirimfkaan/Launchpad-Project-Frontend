import { connect } from 'react-redux';
import UPFooter from '../../components/UPFooter/UPFooter';
import UPNavbar from '../../components/UPNavbar/UPNavbar';
import { useEffect } from 'react';
import { connectWalletDataAction, setWalletAccountData } from '../../store/wallet/walletActions';
import wallet from '../../helpers/wallet';
import './MainLayout.scss';

function MainLayout({ ...props }) {
  const { children, accounts, provider, setWalletAccount } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (provider && window.ethereum?.on) {
      const HandleAccountChange = function (Newaccounts) {
        if (accounts?.[0] != Newaccounts?.[0]) setWalletAccount(Newaccounts);
      };
      window.ethereum.on('accountsChanged', HandleAccountChange);
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', HandleAccountChange);
        }
      };
    }
  }, [provider, accounts]);

  useEffect(() => {
    if (!accounts?.[0]) {
      const walletData = JSON.parse(localStorage.getItem('WALLET_VERIFICATION_DATA'));
      if (walletData) {
        wallet.connectWallet();
      }
    }
  }, [accounts]);
  return (
    <>
      <UPNavbar {...props} />
      {children}
      <UPFooter />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.walletReducer.accounts,
    provider: state.walletReducer.provider,
    MainLayoutStatus: 'True',
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    connectWalletData: (payload) => {
      dispatch(connectWalletDataAction(payload));
    },
    setWalletAccount: (payload) => {
      dispatch(setWalletAccountData(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
