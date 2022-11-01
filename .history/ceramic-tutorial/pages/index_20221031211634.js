import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { useViewerConnection } from "@self.id/react";

export default function Home() {
  const web3ModalRef = useRef();
  const [connection, connect, disconnect] = useViewerConnection();

const getProvider = async () => {
  const provider = await web3ModalRef.current.connect();
  const wrappedProvider = new Web3Provider(provider);
  return wrappedProvider;
};
}
