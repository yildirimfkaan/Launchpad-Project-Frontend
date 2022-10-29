import { Button, Card } from 'react-bootstrap';
import './UPTxList.scss';

export default function TxList({ txs, err }) {
  return (
    <>
      {txs.map((item) => (
        <Card key={item.txHash} text="dark" className="mb-2">
          <Card.Body>
            <Card.Text>From: {item.from}</Card.Text>
            <Card.Text>To: {item.to}</Card.Text>
            <Card.Text>Amount: {item.amount / 10000}</Card.Text>
            <Button variant="primary" href={`https://testnet.bscscan.com/tx/${item.txHash}`}>
              Check in block explorer
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
