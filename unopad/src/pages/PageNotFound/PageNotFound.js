import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = (props) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>404 - Page Not Found</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PageNotFound;
