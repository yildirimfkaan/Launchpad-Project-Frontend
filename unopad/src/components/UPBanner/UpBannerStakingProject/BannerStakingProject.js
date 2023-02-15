/* eslint-disable max-len */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import detectEthereumProvider from '@metamask/detect-provider';

import './BannerStakingProject.scss';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function BannerStakingProject({ ...props }) {
  const { project } = props;
  const item = props.project;
  const addUnoTokenFunction = async () => {
    try {
      const provider = await detectEthereumProvider();
      const wasAdded = await provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: item.token.address,
            symbol: item.token.symbol,
            decimals: item.token.decimals,
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('UnoToken has not been added');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  console.log(item?.token?.symbol)
  return (
    <Container className="staking-home-banner">
      <Row className="text-white text-fs-head-xs">
        <Col>
          <a className="text-white" href="/">
            Home
          </a>
          /Staking
        </Col>
      </Row>
      <Row className="text-white text-fs-title-md mt-4">
        <Col lg={4} md={6}>
          Allocation Staking
        </Col>
      </Row>
      <Row className="text-white text-fs-body-md mt-4">
        <Col lg={4} md={6}>
          We have all been in this industry too long not to make the security of your funds our
          absolute top priority.
        </Col>
      </Row>
      <Row className="mt-4">
        <Button className="mx-2 col-2" onClick={addUnoTokenFunction}>
          Add {item?.token?.symbol}{' '}
        </Button>
        <Button className="col-2">Staking Info</Button>
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer.project,
  };
};

export default connect(mapStateToProps)(BannerStakingProject);
