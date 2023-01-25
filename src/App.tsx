import {
  Chain,
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, polygon, fantom } from "wagmi/chains"
import Wallet from "./Wallet"
import './App.css'
import { useEffect, useState } from "react"

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_WALLETCONNECT_ID) {
  throw new Error('You need to provide REACT_APP_WALLETCONNECT_ID env variable')
}

const projectId = process.env.REACT_APP_WALLETCONNECT_ID

// 2. Wagmi client
const additionalChains: Chain[] = [
  {
    id: 250,
    name: 'Fantom',
    network: 'fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.ankr.com/fantom']
      },
      public: {
        http: ['https://rpc.ankr.com/fantom']
      }
    },
    blockExplorers: {
      default: {name: 'FTMScan', url: 'https://ftmscan.com'},
      public: {name: 'FTMScan', url: 'https://ftmscan.com'}
    },
  },
  {
    id: 7700,
    name: 'Canto',
    network: 'canto',
    nativeCurrency: {
      name: 'Canto',
      symbol: 'CANTO',
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ['https://canto.slingshot.finance']
      },
      public: {
        http: ['https://canto.slingshot.finance']
      }
    },
    blockExplorers: {
      default: {name: 'Canto Explorer', url: 'https://evm.explorer.canto.io'},
      public: {name: 'Canto Explorer', url: 'https://evm.explorer.canto.io'}
    },
  }
]
const chains = [mainnet, ...additionalChains, arbitrum]
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// 3. Configure modal ethereum client
export const ethereumClient = new EthereumClient(wagmiClient, chains)

function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])
  
  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <Wallet />
        </WagmiConfig>
      ) : null}
    </>
  )
}

export default App;

