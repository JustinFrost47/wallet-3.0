import { useState } from "react" 
import WalletDetails from "../WalletDetails"
import { Button } from "../../components/ui/button";


import nacl from "tweetnacl";
import { /*generateMnemonic,*/ mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";


interface SolanaKeyProp {
    phrase: string,
}

export default function SolanaKeys({phrase} : SolanaKeyProp) {
  
    const [solKeys, setSolKeys] = useState('')

    const generateKeyPair = (mnemonic : string) => {

        const seed = mnemonicToSeedSync(mnemonic);
        for (let i = 0; i < 4; i++) {
        const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        // const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        //console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
        // setSolKeys(Keypair.fromSecretKey(secret).publicKey.toBase58())

        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const secretKey = keypair.secretKey;
        const publicKey = keypair.publicKey;

        const solanaPublicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();
        const solanaPrivateKey = Buffer.from(secretKey).toString('hex')

        console.log(keypair)
        console.log(publicKey)

        setSolKeys({
            publicKey: solanaPublicKey ,
            privateKey: solanaPrivateKey ,
        })



    }
    }
    console.log(solKeys)
  
    return (
        <>

        {solKeys  ? (
            

            <>
                             <div >
                    <img className="h-8 w-8 "  src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" alt="Solana" />
                </div>
            <WalletDetails publicKey={solKeys.publicKey} privateKey={solKeys.privateKey}/>
            </>

        ): (
            <Button className="flex-1 flex-col " onClick={() => generateKeyPair(phrase)}>
                 
                 <div >
                    <img className="h-8 w-8 "  src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" alt="Solana" />
                </div>
                 
                 <div>
                 Reveal Solana Keys
                 </div>
            </Button>
        )}
        
        

        </>

  )
}
