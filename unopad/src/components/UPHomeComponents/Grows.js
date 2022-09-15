import React from 'react';
import './UPHomeComponents.scss';

function Grows() {
  return (
    
      <section className="grows-section pt-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="grows-img mb-30">
                <img
                  src="assets/img/grows-img.png"
                  alt=""
                  className=" wow fadeInLeft"
                  data-wow-delay=".5s"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="grows-content-wrapper mb-30">
                <h2 className="mb-35 wow fadeInDown" data-wow-delay=".2s">
                  Great Effeciency Like Never Before
                </h2>
                <p className="mb-35 wow fadeInLeft" data-wow-delay=".4s">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                  tempor invidunt ut labore. Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed dianonumy eirmod tempor invidunt ut labore.
                </p>
                <p className="mb-35 wow fadeInLeft" data-wow-delay=".6s">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                  tempor invidunt ut labore. Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed dianonumy eirmod tempor invidunt ut labore.
                </p>
                <a href="#" className="theme-btn theme-btn-2 wow fadeInUp" data-wow-delay=".6s">
                  Download History
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    
  );
}

export default Grows;
