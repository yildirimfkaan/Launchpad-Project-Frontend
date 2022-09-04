import React from 'react';
import About from '../../components/UPHomeComponents/About';
import Service from '../../components/UPHomeComponents/Service';
import Roadmap from '../../components/UPHomeComponents/Roadmap';
import Grows from '../../components/UPHomeComponents/Grows';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <>
        <React.Fragment>
          <section id="home" class="hero-section">
            <div class="shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
            </div>
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xl-7 col-lg-7">
                  <div class="hero-content-wrapper">
                    <h1 class="text-white wow fadeInDown" data-wow-delay=".2s">
                      Trade and Invest on Crypto Using Our Platform
                    </h1>
                    <p class="text-white wow fadeInLeft" data-wow-delay=".4s">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                      tempor invidunt ut labore .
                    </p>
                    <a href="#" class="theme-btn wow fadeInUp" data-wow-delay=".6s">
                      Register Now
                    </a>
                  </div>
                </div>
                <div class="col-xl-5 col-lg-5">
                  <div class="hero-img">
                    <img
                      src="assets/img/hero-img.svg"
                      alt=""
                      class="wow fadeInRight"
                      data-wow-delay=".5s"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="feature" class="feature-section pt-150">
            <div class="container">
              <div class="row">
                <div class="col-xl-7 col-lg-8 mx-auto">
                  <div class="section-title text-center mb-55">
                    <h2 class="mb-20 wow fadeInUp" data-wow-delay=".2s">
                      Our Specialities
                    </h2>
                    <p class="wow fadeInUp" data-wow-delay=".4s">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                      tempor invidunt ut labore .
                    </p>
                  </div>
                </div>
              </div>
              <div class="features-wrapper">
                <div class="row justify-content-center">
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-feature text-center mb-30 wow fadeInUp" data-wow-delay=".2s">
                      <div class="feature-img mb-20">
                        <img src="assets/img/feature-1.svg" alt="" />
                      </div>
                      <div class="feature-content">
                        <h5>Buy Your Crypto</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy
                          eirmod tempor invidunt ut labore .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-feature text-center mb-30 wow fadeInUp" data-wow-delay=".4s">
                      <div class="feature-img mb-25">
                        <img src="assets/img/feature-2.svg" alt="" />
                      </div>
                      <div class="feature-content">
                        <h5>Sell Instantly</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy
                          eirmod tempor invidunt ut labore .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-feature text-center mb-30 wow fadeInUp" data-wow-delay=".6s">
                      <div class="feature-img mb-20">
                        <img src="assets/img/feature-3.svg" alt="" />
                      </div>
                      <div class="feature-content">
                        <h5>Invest for Longterm</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy
                          eirmod tempor invidunt ut labore .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
        <br></br>
        <React.Fragment>
          <About />
          <Service />
          <Roadmap />
          <Grows />
        </React.Fragment>
      </>
    );
  }
}

export default Home;
