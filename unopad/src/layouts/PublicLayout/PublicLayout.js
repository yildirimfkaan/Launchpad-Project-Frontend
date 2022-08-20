import { connect } from 'react-redux';
import UPAlerts from '../../components/UPAlerts/UPAlerts';
import './PublicLayout.scss';

function PublicLayout({ ...props }) {
  const { children } = props;

  return (
    <>
      <UPAlerts />
      <div className="public-layout d-flex flex-row align-items-center justify-content-center">
        {children}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(PublicLayout);
