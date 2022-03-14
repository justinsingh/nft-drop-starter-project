import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!");

        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key: ",
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Please install Phantom Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
    else {
      alert("Install Phantom Wallet!");
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const image1 = require("./assets/1.png").default;
  const image2 = require("./assets/2.png").default;
  const image3 = require("./assets/3.png").default;

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Justin's Art</p>
          <p className="sub-text">Solana Devnet Candy Machine</p>
          <p className="smaller-sub-text">Phantom Wallet Compatible</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
      </div>
      <div className="image-container">
        <img src={image1} alt="Art #1" width="500px" height="560px"/>
        <img src={image2} alt="Art #2" width="500px" height="560px"/>
        <img src={image3} alt="Art #3" width="500px" height="560px"/>
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  );
};

export default App;
