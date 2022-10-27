import React from 'react';
import About from '../../components/UPHomeComponents/About';
import Service from '../../components/UPHomeComponents/Service';
import Roadmap from '../../components/UPHomeComponents/Roadmap';
import Grows from '../../components/UPHomeComponents/Grows';
import Subscribe from '../../components/UPSubscribe/Subscribe';
import HomeSales from '../../components/UPHomeSales/HomeSales';
import './Home.scss';
import MeatTeam from '../../components/UPMeetTeam/MeetTeam';


function Home() {
  return (
    <>
      <div
        className="home-banner mt-2 border d-flex 
      align-items-center justify-content-center text-muted h5"
      >
        Banner
      </div>
      <HomeSales />

      <br></br>
      <br></br>
      <br></br>
      <MeatTeam />
      <Subscribe />
      <About />
      <Service />
      <Roadmap />
      
      <Grows />
    </>
  );
}

export default Home;
