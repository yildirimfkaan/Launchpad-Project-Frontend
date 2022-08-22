import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import UPNavbar from '../../components/UPNavbar/UPNavbar';
import { useEffect } from 'react';
import { connectWalletDataAction } from '../../store/wallet/walletActions';
import wallet from '../../helpers/wallet';
import './MainLayout.scss';

function MainLayout({ ...props }) {
  const { children, connectWalletData, accounts } = props;

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
      <UPNavbar />
      {children}
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.walletReducer.accounts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    connectWalletData: (payload) => {
      dispatch(connectWalletDataAction(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
