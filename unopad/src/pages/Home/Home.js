import React from 'react';
import About from '../../components/UPHomeComponents/About';
import Service from '../../components/UPHomeComponents/Service';
import Roadmap from '../../components/UPHomeComponents/Roadmap';
import Grows from '../../components/UPHomeComponents/Grows';
import Subscribe from '../../components/UPSubscribe/Subscribe';
import './Home.scss';

function Home() {
  return (
    <>
      <div
        className="home-banner mt-2 border d-flex 
      align-items-center justify-content-center text-muted h5"
      >
        Banner
      </div>
      <Subscribe />
      <About />
      <Service />
      <Roadmap />
      
      <Grows />
    </>
  );
}

export default Home;
