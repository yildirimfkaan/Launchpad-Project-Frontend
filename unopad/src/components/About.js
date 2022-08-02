import React from 'react';

function About() {
  return (
    <React.Fragment>
      <section id="about" class="about-section pt-150 pb-20">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-6 col-lg-6">
              <div class="about-img mb-30">
                <img
                  src="../assets/img/about-img.svg"
                  alt="image"
                  class=" wow fadeInLeft"
                  data-wow-delay=".4s"
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="about-content mb-30">
                <div class="section-title mb-40">
                  <h2 class="wow fadeInUp" data-wow-delay=".2s">
                    About Us
                  </h2>
                </div>
                <p class="mb-15 wow fadeInUp" data-wow-delay=".4s">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                  tempor invidunt ut labore. Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed dianonumy eirmod tempor invidunt ut labore. Lorem ipsum dolor sit amet,
                  consetetur sadipscing elitr, sed dianonumy eirmod tempor invidunt ut labore.
                </p>
                <p class="mb-35 wow fadeInUp" data-wow-delay=".6s">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                  tempor invidunt ut labore. Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed dianonumy eirmod tempor invidunt ut labore.
                </p>
                <a href="#" class="theme-btn theme-btn-2 wow fadeInRight" data-wow-delay=".8s">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default About;
