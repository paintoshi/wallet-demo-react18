import React from 'react'
import { useWeb3Modal, Web3Button, Web3Modal, useWeb3ModalNetwork  } from '@web3modal/react'
import { Chain, useAccount } from 'wagmi'
import ThemeControls from './components/ThemeControls'
import { ethereumClient } from './App'
import { useNetwork, useSwitchNetwork } from 'wagmi'

const Wallet= () => {
  const { selectedChain, setSelectedChain } = useWeb3ModalNetwork()

  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  console.log('isConnected', isConnected)
  console.log('open', open)
  console.log('selectedChain', selectedChain)

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <>
      <Web3Button balance="show" icon="hide" label="Connect" />
      {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))}
 
      <div>{error && error.message}</div>

      <ThemeControls />

      <Web3Modal
        ethereumClient={ethereumClient}
        // Custom Linking Mobile Wallets
        mobileWallets={[
          {
            id: 'metaMask',
            name: 'MetaMask',
            links: { native: 'metamask://', universal: 'https://metamask.app.link' }
          },
          {
            id: 'trust',
            name: 'Trust Wallet',
            links: { native: 'trust://', universal: 'https://link.trustwallet.com' }
          },
          {
            id: 'ledger',
            name: 'Ledger Live',
            links: { native: 'ledgerlive://', universal: 'https://www.ledger.com' }
          },
          {
            id: 'rainbow',
            name: 'Rainbow',
            links: { native: 'rainbow://', universal: 'https://rainbow.me' }
          },
          {
            id: 'zerion',
            name: 'Zerion',
            links: { native: 'zerion://', universal: 'https://wallet.zerion.io' }
          },
          {
            id: 'tokenary',
            name: 'Tokenary',
            links: { native: 'tokenary://', universal: 'https://tokenary.io' }
          }
        ]}
        // Custom Linking Desktop Wallets
        desktopWallets={[
          {
            id: 'ledger',
            name: 'Ledger Live',
            links: { native: 'ledgerlive://', universal: 'https://www.ledger.com' }
          },
          {
            id: 'zerion',
            name: 'Zerion',
            links: { native: 'zerion://', universal: 'https://wallet.zerion.io' }
          },
          {
            id: 'tokenary',
            name: 'Tokenary',
            links: { native: 'tokenary://', universal: 'https://tokenary.io' }
          },
          {
            id: 'oreid',
            name: 'OREID',
            links: {
              native: '',
              universal: 'https://www.oreid.io/'
            }
          }
        ]}
        // Custom Wallet Images
        walletImages={{
          metaMask: '/images/wallet_metamask.webp',
          brave: '/images/wallet_brave.webp',
          ledger: '/images/wallet_ledger.webp',
          coinbaseWallet: '/images/wallet_coinbase.webp',
          zerion: '/images/wallet_zerion.webp',
          trust: '/images/wallet_trust.webp',
          rainbow: '/images/wallet_rainbow.webp',
          oreid: '/images/wallet_oreid.svg'
        }}
        // Custom Chain Images
        chainImages={{
          137: '/images/chain_polygon.webp',
          10: '/images/chain_optimism.webp',
          42161: '/images/chain_arbitrum.webp'
        }}
      />
    </>
  )
}

export default Wallet