import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Alert from '../../components/Alert';
import { useEffect } from 'react';
import { connectWalletDataAction } from '../../store/wallet/walletActions';
import wallet from '../../helpers/wallet';

function MainLayout({ ...props }) {
  const { children, connectWalletData, accounts } = props;

  useEffect(() => {
    console.log(accounts,"acc before if")
    if (!accounts?.[0]) {
      const walletData = JSON.parse(localStorage.getItem('WALLET_VERIFICATION_DATA'));
      console.log(walletData, 'walletdata');
      if (walletData) {
        wallet.connectWallet();
      }
    }
  }, [accounts]);
  return (
    <>
      <Navigation />
      <Alert />
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
