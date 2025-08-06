import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { App } from './app.tsx'
import { 
  createDefaultAuthorizationCache, 
  createDefaultChainSelector, 
  createDefaultWalletNotFoundHandler,
  registerMwa, 
} from '@solana-mobile/wallet-standard-mobile';

registerMwa({
  appIdentity: {
    name: 'My app',
    uri: 'https://solana-walle.vercel.app',
  },    
  authorizationCache: createDefaultAuthorizationCache(),
  chains: ['solana:devnet', 'solana:mainnet'],
  chainSelector: createDefaultChainSelector(),
  onWalletNotFound: createDefaultWalletNotFoundHandler()
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
