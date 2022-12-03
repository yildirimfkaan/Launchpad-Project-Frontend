import { useEffect } from 'react';
import { connect } from 'react-redux';
import UPFooter from '../../components/UPFooter/UPFooter';
import UPNavbar from '../../components/UPNavbar/UPNavbar';
import './PublicLayout.scss';

function PublicLayout({ ...props }) {
  const { children } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <UPNavbar {...props} />
      <div className="public-layout d-flex flex-row justify-content-center py-5 my-5">
        {children}
      </div>
      <UPFooter {...props} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(PublicLayout);
