import { useState } from "react"
import { Button } from "../../components/ui/button";
import Wallet from "../Wallets/Solana/SolWalletCard";


import nacl from "tweetnacl";
import { /*generateMnemonic,*/ mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';


interface SolanaKeyProp {
    phrase: string,
}

interface SolKeys {
    publicKey: string;
    privateKey: string;
}


export default function SolanaKeys({ phrase }: SolanaKeyProp) {

    const [count, setCount] = useState(1)

    const [solKeys, setSolKeys] = useState<SolKeys[]>([])

    const generateKeyPair = (mnemonic: string, pathCount: number = 1) => {


        const seed = mnemonicToSeedSync(mnemonic);

        const path = `m/44'/501'/${pathCount - 1}'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        // const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        //console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
        // setSolKeys(Keypair.fromSecretKey(secret).publicKey.toBase58())

        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const secretKey = keypair.secretKey;
        // const publicKey = keypair.publicKey;

        const solanaPublicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();
        const solanaPrivateKeyHex = Buffer.from(secretKey).toString('hex')


        //hex to base58 conversion
        const solanaPrivateKey = bs58.encode(Buffer.from(solanaPrivateKeyHex, 'hex'));
        setSolKeys([
            ...solKeys,
            {
                publicKey: solanaPublicKey,
                privateKey: solanaPrivateKey,
            }
        ])
        // console.log({
        //     publicKey: solanaPublicKey,
        //     privateKey: solanaPrivateKey,
        // })
        // console.log(solKeys)

    }

    const incrementKeys = () => {
        setCount(count + 1)
        generateKeyPair(phrase, count + 1)
    }



    return (
        <>


            {solKeys.length > 0 ? (


                <>
                    <img className="h-8 w-8 " src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" alt="Solana" />
                    {solKeys.map((solKey, i) => (

                        <div key={i} >


                            <Wallet publicKey={solKey.publicKey} privateKey={solKey.privateKey} />
                        </div>

                    ))}
                    <Button className="my-8" onClick={incrementKeys}> Add Keys </Button>
                </>

            ) : (
                <Button className="flex-1 flex-col m-8 shadow-2xl" onClick={() => generateKeyPair(phrase)}>

                    <div >
                        <img className="h-8 w-8 " src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" alt="Solana" />
                    </div>

                    <div>
                        Show Solana Keys
                    </div>
                </Button>
            )}



        </>

    )
}
