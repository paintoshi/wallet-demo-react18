import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { arbitrum, mainnet, fantom } from "wagmi/chains"
import Wallet from "./Wallet"
import './App.css'
import { useEffect, useState } from "react"
import { configureChains, createConfig, WagmiConfig } from 'wagmi'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_WALLETCONNECT_ID) {
  console.error("Need to provide a wallet connect ID as REACT_APP_WALLETCONNECT_ID env variable")
}

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_WALLETCONNECT_ID ?? ''
const chains = [mainnet, arbitrum, fantom]
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  })

// 2. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])
  
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Wallet ethereumClient={ethereumClient} projectId={projectId} configChains={chains} />
        </WagmiConfig>
      ) : null}
    </>
  )
}

export default App;

