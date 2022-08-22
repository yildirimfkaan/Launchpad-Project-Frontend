import { connect } from 'react-redux';
import './PublicLayout.scss';

function PublicLayout({ ...props }) {
  const { children } = props;

  return (
    <>
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
