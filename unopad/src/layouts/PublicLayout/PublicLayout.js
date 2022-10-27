import { connect } from 'react-redux';
import UPNavbar from '../../components/UPNavbar/UPNavbar';
import './PublicLayout.scss';

function PublicLayout({ ...props }) {
  const { children } = props;

  return (
    <>
      <UPNavbar {...props}/>
      <div className="public-layout d-flex flex-row justify-content-center py-5 my-5">
        {children}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(PublicLayout);
