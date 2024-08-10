import { useState } from 'react'
import GeneratePhrase from './PhraseGeneration/GeneratePhrase'
import SolanaKeys from './KeyGeneration/SolanaKeys'
import EthKeys from './KeyGeneration/EthKeys'

export default function Home() {
  
  const [phrase, setPhrase] = useState('')
  const [continueFlag, setContinueFlag] = useState(false)
  
  return (
    
    <div className='w-screen h-screen bg-slate-800  '>
        
        <div className="container px-12 py-8 flex flex-col items-center justify-center ">
        <div className='text-white text-4xl my-12' >Web Crypto Wallet</div>

          {phrase && continueFlag ? (

            <>
            <SolanaKeys phrase={phrase}/>
            <EthKeys phrase={phrase}/>
            </>

          ): (
            <GeneratePhrase phrase={phrase} setPhrase={setPhrase} setContinueFlag={setContinueFlag}/>
          )}
            
            
        </div>
    </div>
  )
}
