import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './UPRoadMap.scss';

function UPRoadmap() {
  const [key, setKey] = useState('registrationOpens');

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
      <Tab eventKey="registrationOpens" title="Registration Opens">
        Token Info / Sale Info
      </Tab>
      <Tab eventKey="registrationClosed" title="Registration Closed">
        empty
      </Tab>
      <Tab eventKey="stakingRound" title="Staking Round">
        empty
      </Tab>
      <Tab eventKey="boosterRound" title="Booster Round" disabled>
        empty
      </Tab>
      <Tab eventKey="saleEnds" title="Sale Ends" disabled>
        empty
      </Tab>
    </Tabs>
  );
}

export default UPRoadmap;
