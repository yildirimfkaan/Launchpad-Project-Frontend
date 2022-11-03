import React from 'react';
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

    </>
  );
}

export default Home;
