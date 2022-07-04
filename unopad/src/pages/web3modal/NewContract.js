import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import Contract from "../Contract";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { toHex, truncateAddress } from "./utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import {Container, Card, Row, Col, Button, NavLink} from "react-bootstrap";
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

export default function NewContract(data_detail) {
  const item = data_detail
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };
  
  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        
        if (accounts) setAccount(accounts[0]);
      };
      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
  return (
    <>
     <Container>
      <Row>
      <Col xs={12} sm={4} md={4} lg={4}>
        <Card >
          <Card.Img variant="top" src={"http://127.0.0.1/api/projects/" + item.id + "/image"} />
          <Card.Body>

          <Card.Title>{item.project_name}</Card.Title>
          <Card.Text>
          {item.project_sale_type}
          </Card.Text>
          <HStack>
            {!account ? (
              <Button variant="primary" onClick={connectWallet}>Stake Now !</Button>   
            ) : (
              <Button onClick={disconnect}>Disconnect</Button>
            )}
          </HStack>
          <Text>{error ? error.message : null}</Text>       
          </Card.Body>
        </Card>
      </Col>
      <Col>
        {account && (
          <div>
            <Contract />
          </div>
          )}
      </Col>


      </Row>
      </Container>
      
    </>
  );
}
