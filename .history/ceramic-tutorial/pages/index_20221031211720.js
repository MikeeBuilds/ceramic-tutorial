import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { useViewerConnection } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";

export default function Home() {
  const web3ModalRef = useRef();
  const [connection, connect, disconnect] = useViewerConnection();

const getProvider = async () => {
  const provider = await web3ModalRef.current.connect();
  const wrappedProvider = new Web3Provider(provider);
  return wrappedProvider;
};

useEffect(() => {
  if (connection.status !== "connected") {
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }
}, [connection.status]);

const connectToSelfID = async () => {
  const ethereumAuthProvider = await getEthereumAuthProvider();
  connect(ethereumAuthProvider);
};

const getEthereumAuthProvider = async () => {
  const wrappedProvider = await getProvider();
  const signer = wrappedProvider.getSigner();
  const address = await signer.getAddress();
  return new EthereumAuthProvider(wrappedProvider.provider, address);
};


}
