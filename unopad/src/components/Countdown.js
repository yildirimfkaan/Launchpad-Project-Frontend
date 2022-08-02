import React from 'react';

function Countdown() {
  return (
    <React.Fragment>
      <section
        className="countdown-section pt-70 pb-70 img-bg"
        style={{ backgroundImage: 'url(assets/img/common-bg.jpg)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="countdown-img">
                <img
                  src="assets/img/countdown-img.svg"
                  alt=""
                  className=" wow fadeInLeft"
                  data-wow-delay=".4s"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="countdown-content-wrapper">
                <div className="countdown">
                  <ul id="countdown-example">
                    <li>
                      <span className="days">89</span>
                      <p className="days_text">DAYS</p>
                    </li>
                    <li>
                      <span className="hours">53</span>
                      <p className="hours_text">HOUR</p>
                    </li>
                    <li>
                      <span className="minutes">34</span>
                      <p className="minutes_text">MINS</p>
                    </li>
                    <li>
                      <span className="seconds">08</span>
                      <p className="seconds_text">SECS</p>
                    </li>
                  </ul>
                </div>
                <div className="countdown-content">
                  <h2 className="text-white mb-35  wow fadeInUp" data-wow-delay=".2s">
                    Smart and Secure Way to Invest in Crypto
                  </h2>
                  <p className="text-white mb-30 wow fadeInUp" data-wow-delay=".4s">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                    tempor invidunt. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    dianonumy eirmod tempor invidunt ut labore.
                  </p>
                  <a href="#" className="theme-btn wow fadeInUp" data-wow-delay=".6s">
                    Buy Token Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Countdown;
