import React from 'react';
import Subscribe from '../../components/UPSubscribe/Subscribe';
import HomeSales from '../../components/UPHomeSales/HomeSales';
import './Home.scss';
import MeatTeam from '../../components/UPMeetTeam/MeetTeam';

function Home({...props}) {
  return (
    <>
      <HomeSales {...props}/>

      <br></br>
      <br></br>
      <br></br>
      <MeatTeam />
      <Subscribe />

    </>
  );
}

export default Home;
