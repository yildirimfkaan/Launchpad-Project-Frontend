import { Link, Table, Progress, Container, Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";



export default function Card1( avalaunch_api_data ) {

  const list = [
    {
      title: "Oh! Finance",
      symbol: "OH",
      logo_url: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/oh-finance\/oh_finance_logo.jpeg",
      background_image: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/oh-finance\/ohfinance_background.jpg",
      token_price_in_avax: 0.00112549240292628,
      target_raised: 600.000,
      percent_raised : 95.952,
      number_of_registrations: 10524,
      number_of_participants: 9974,
      token_price_in_usd: 0.08,
      state : "Ended",
      total_tokens_sold: 7196423.613653708,
      token_distribution: 7500000
    },
    {
      title: "HEROES CHAINED",
      symbol: "HEC",
      logo_url: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_icon.svg",
      background_image: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_background.jpg",
      token_price_in_avax: 0.002342549240292628,
      target_raised: 400.000,
      percent_raised : 50.952,
      number_of_registrations: 10524,
      number_of_participants: 9974,
      token_price_in_usd: 0.10,
      state : "Ended",
      total_tokens_sold: 75,
      token_distribution: 75
    },
    {
      title: "HEROES CHAINED",
      symbol: "HEC",
      logo_url: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_icon.svg",
      background_image: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/meta_derby\/background.png",
      token_price_in_avax: 0.002342549240292628,
      target_raised: 400.000,
      percent_raised : 50.952,
      number_of_registrations: 10524,
      number_of_participants: 9974,
      token_price_in_usd: 0.10,
      state : "Ended",
      total_tokens_sold: 75,
      token_distribution: 75
    },
    {
      title: "HEROES CHAINED",
      symbol: "HEC",
      logo_url: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_icon.svg",
      background_image: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_background.jpg",
      token_price_in_avax: 0.002342549240292628,
      target_raised: 400.000,
      percent_raised : 50.952,
      number_of_registrations: 10524,
      number_of_participants: 9974,
      token_price_in_usd: 0.10,
      state : "Ended",
      total_tokens_sold: 75,
      token_distribution: 75
    },
    {
      title: "HEROES CHAINED",
      symbol: "HEC",
      logo_url: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_icon.svg",
      background_image: "https:\/\/avalaunch.s3.us-east-2.amazonaws.com\/images\/sales\/crabada\/crabada_background.jpg",
      token_price_in_avax: 0.002342549240292628,
      target_raised: 400.000,
      percent_raised : 50.952,
      number_of_registrations: 10524,
      number_of_participants: 9974,
      token_price_in_usd: 0.10,
      state : "Ended",
      total_tokens_sold: 75,
      token_distribution: 75
    },
  ];

  return (
    <Grid.Container gap={2} justify="flex-start">
      {avalaunch_api_data['projects'].map((item, index) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={index} to={item.id} >
          <Card cover css={{minHeight:"600px", height: "100%", w: "100%", p: 0, backgroundImage: `url(${item.background_image})` }}>
            <Card.Header css={{height: "20%", bgBlur: "#0f1114",}}>
            <Row>
            <Col span={3} >
                      <Card.Image
                        src= {item.logo_url}
                        height={50}
                        width={40}
                        alt="Breathing app icon"
                      />
                </Col>
              <Col>
                <Text size={20} weight="bold" transform="uppercase">
                 {item.title}
                </Text>
                <Text h3 >
                  1 {item.symbol} = { parseFloat( item.token_price_in_avax).toFixed(6) } AVAX
                </Text>
              </Col>
              </Row>
            </Card.Header>
            <Card.Body css={{ width: "100%", height: "70%", bgBlur: "white", }}>
            <Container>
              <br></br>
                <Row>
                  <Col>
                    <Text size={15} weight="bold" transform="uppercase" color="black">
                        Total Raised
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text size={15} weight="bold" transform="uppercase" color="black">
                      ${item.target_raised.toFixed(3)}/{item.target_raised.toFixed(3)}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text color="black">0</Text>
                  </Col>
                  <Col offset={9} >
                    <Text color="black">100</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Progress value={item.percent_raised} shadow color="warning" status="warning" min={0} max={100} />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={12}>  
                      <Table headerLined css={{ height: "auto", minWidth: "100%", backgroundColor : "white" }} >
                        <Table.Header>
                          <Table.Column> Properties</Table.Column>
                          <Table.Column> Amount</Table.Column>
                          
                        </Table.Header>
                        <Table.Body>
                          <Table.Row key="1">
                            <Table.Cell>Registrations</Table.Cell>
                            <Table.Cell>{item.number_of_registrations}</Table.Cell>
                          </Table.Row>
                          <Table.Row key="2">
                            <Table.Cell>Participants</Table.Cell>
                            <Table.Cell>{item.number_of_participants }</Table.Cell>
                          </Table.Row>
                          <Table.Row key="3">
                            <Table.Cell>Token Price</Table.Cell>
                            <Table.Cell>${item.token.token_price_in_usd }</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>                   
                  </Col>
                </Row>
                
              </Container>
            </Card.Body>
            <Card.Footer
            
              css={{
                bgBlur: "white",
                bottom: 0,
                zIndex: 1,
                height: "15%",
              }} >
              <Container>
                  <Row>
                    <Col>
                    <Text> Tokens Sold:</Text>
                    <Text> Total Tokens:</Text>
                    </Col>
                    <Col>
                    <Text> { parseFloat( item.total_tokens_sold ).toFixed(2)}M </Text>
                    <Text> { parseFloat( item.token.token_distribution ).toFixed(2)}M </Text>
                    </Col>
                    <Col></Col>

                    
                    <Col >
                    <Link href={"project/" + item.id}>
                        <Button
                          flat
                          auto
                          rounded
                          css={{ color: "#94f9f0", bg: "#94f9f026" }}
                          
                        >
                          <Text
                            css={{ color: "inherit" }}
                            size={12}
                            weight="bold"
                            transform="uppercase"
                          >
                            {item.state}
                          </Text>
                        </Button>
                      </Link>
                    </Col>

                  </Row>
                </Container>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
};
