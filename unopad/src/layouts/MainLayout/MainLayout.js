import { connect } from 'react-redux';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';
import Alert from '../../components/Alert';

function MainLayout({ ...props }) {
  const { children } = props;

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
  return {};
};

export default connect(mapStateToProps)(MainLayout);
