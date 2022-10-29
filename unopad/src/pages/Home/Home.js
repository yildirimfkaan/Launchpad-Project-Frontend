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
