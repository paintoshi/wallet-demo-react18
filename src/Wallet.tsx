import React from 'react'
import { Web3Button, Web3Modal  } from '@web3modal/react'
import { useAccount, useNetwork, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { EthereumClient } from '@web3modal/ethereum'
import { Chain } from 'viem'
import { Widget } from './Widget'

const Wallet= ({ethereumClient, projectId, configChains}: {ethereumClient: EthereumClient, projectId: string, configChains: Chain[]}) => {
  const { isConnected } = useAccount()
  console.log('isConnected', isConnected)
  // Log the wagmi.store from local storage
  console.log('wagmi.store:', JSON.parse(localStorage.getItem('wagmi.store') ?? '{}'))

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  // For injected wallet
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div style={{display: 'grid', gridGap: '16px', width: "300px"}}>
      <Web3Button balance="show" icon="hide" label="Connect Web3Modal" />
      <Widget />
      {!isConnected ? (
        <button onClick={() => connect({connector: connectors.find((connector) => connector.id === 'injected')})}>Connect Injected</button>
      ) : (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}
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

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
      />
    </div>
  )
}

export default Wallet