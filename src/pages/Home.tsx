import { useState } from 'react'
import GeneratePhrase from './PhraseGeneration/GeneratePhrase'
import WalletDetails from './WalletDetails'

export default function Home() {
  
  const [phrase, setPhrase] = useState(localStorage.getItem('mnemonic'))
  
  return (
    
    <div className='w-screen h-screen bg-slate-800  '>
        
        <div className="container px-12 py-8 flex flex-col items-center justify-center ">
        <div className='text-white text-4xl my-12' >Web Crypto Wallet</div>

          {phrase ? (

            <WalletDetails/>

          ): (
            <GeneratePhrase/>
          )}
            
            
        </div>
    </div>
  )
}
