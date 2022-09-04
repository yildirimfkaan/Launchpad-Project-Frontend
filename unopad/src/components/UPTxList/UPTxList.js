import { Button, Card } from 'react-bootstrap';
import './UPTxList.scss';

export default function TxList({ txs, err }) {
  return (
    <>
      {txs.map((item) => (
        // <div key={item.txHash} className="alert-info mt-5 rounded-xl py-2 px-4">
        //   <div>
        //     <p>From: {item.from}</p>
        //     <p>To: {item.to}</p>
        //     <p>Amount: {item.amount}</p>
        //     <a target="blank" href={`https://testnet.bscscan.com/tx/${item.txHash}`}>
        //       Check in block explorer
        //     </a>
        //   </div>
        // </div>

        <Card key={item.txHash} text="dark" className="mb-2">
          <Card.Body>
            <Card.Text>From: {item.from}</Card.Text>
            <Card.Text>To: {item.to}</Card.Text>
            <Card.Text>Amount: {item.amount}</Card.Text>
            <Button variant="primary" href={`https://testnet.bscscan.com/tx/${item.txHash}`}>
              Check in block explorer
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
