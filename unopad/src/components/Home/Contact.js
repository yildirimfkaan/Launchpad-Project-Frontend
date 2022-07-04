import React from "react";



function Contact() {
  return (

    

<React.Fragment>
<section id="contact" className="contact-section pt-120 pb-105">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-7">
              <div className="contact-wrapper mb-30">
                <h2 className="mb-20 wow fadeInDown" data-wow-delay=".2s">Cotact With Us</h2>
                <p className="mb-55 wow fadeInUp" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dianonumy eirmod tempor invidunt.</p>
                <form action="assets/mail.php" method="POST" id="contact-form" className="contact-form">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <input type="text" id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <input type="email" id="email" name="email" placeholder="Email" />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <input type="text" id="phone" name="phone" placeholder="Phone" />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <input type="text" id="subject" name="subject" placeholder="Subject" />
                    </div>
                    <div className="col-lg-12">
                      <textarea name="message" id="message" rows={5} placeholder="Message" defaultValue={""} />
                    </div>
                  </div>                                
                  <button type="submit" className="theme-btn theme-btn-2">SEND MESSAGE</button>
                </form>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="contact-map mb-30">
                <div className="map-canvas">
                  <iframe className="map" id="gmap_canvas" src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        

</React.Fragment>
   
)
};

export default Contact;