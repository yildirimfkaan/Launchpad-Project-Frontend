import React from 'react';

function Footer() {
  return (
    <React.Fragment>
      <link rel="stylesheet" href="../assets/css/footer.css" />
      <footer class="footer pt-100 img-bg footer-bg footer-section">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="footer-widget mb-60 wow fadeInLeft" data-wow-delay=".2s">
                <a href="index.html" class="logo mb-40">
                  <img src="assets/img/logo.svg" alt="" />
                </a>
                <p class="mb-30">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod
                  tempor invidunt ut labore.
                </p>
                <div class="footer-social-links">
                  <ul>
                    <li>
                      <a href="#">
                        <i class="lni lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="lni lni-twitter-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="lni lni-linkedin-original"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="lni lni-instagram-original"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-6">
              <div class="footer-widget mb-60 wow fadeInUp" data-wow-delay=".4s">
                <h4>Company</h4>
                <ul class="footer-links">
                  <li>
                    <a href="/Home">Home</a>
                  </li>
                  <li>
                    <a href="/Home#about">About</a>
                  </li>
                  <li>
                    <a href="/Home#service">Service</a>
                  </li>
                  <li>
                    <a href="/Home#team">Team</a>
                  </li>
                  <li>
                    <a href="/Home#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget mb-60 wow fadeInUp" data-wow-delay=".6s">
                <h4>Resource</h4>
                <ul class="footer-links">
                  <li>
                    <a href="javascript:void(0)">Documentation</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">IOS & Android Apps</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Support Forum</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Terms Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget mb-60 wow fadeInRight" data-wow-delay=".8s">
                <h4>Resource</h4>
                <ul>
                  <li class="mb-30">
                    <p>
                      Company No: C5B345 <br />
                      CSINE GROUP LTD.
                    </p>
                  </li>
                  <li>
                    <p>
                      Address: M-321 Volunt Ave, <br /> Staten Islandm, NY 201526
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="copyright-area">
            <p class="mb-0 text-white text-center">
              Designed and Developed By{' '}
              <a href="https://uideck.com" rel="nofollow noreferrer" target="_blank">
                UIdeck
              </a>
            </p>
          </div>
        </div>
      </footer>
      <a href="#" class="scroll-top">
        <i class="lni lni-chevron-up"></i>
      </a>
      {/* <script src="../assets/js/bootstrap.bundle-5.0.0.alpha-1-min.js"></script> */}
      <script src="../assets/js/contact-form.js"></script>
      <script src="../assets/js/wow.min.js"></script>
      <script src="../assets/js/main.js"></script>
    </React.Fragment>
  );
}

export default Footer;
