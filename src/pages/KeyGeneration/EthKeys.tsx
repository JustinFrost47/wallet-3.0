import { useState } from "react"
import { Button } from "../../components/ui/button"
import Wallet from "../Wallets/Wallet";


import { HDNodeWallet, Mnemonic } from "ethers";



// import nacl from "tweetnacl";
// import { /*generateMnemonic,*/ mnemonicToSeedSync } from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import bs58 from 'bs58';


interface EthKeyProp {
    phrase: string,
}

interface EthKeys {
    publicKey: string;
    privateKey: string;
}



export default function EthKeys({ phrase }: EthKeyProp) {

    const [count, setCount] = useState(1)

    const [ethKeys, setEthKeys] = useState<EthKeys[]>([])

    const generateKeyPair = (mnemonic: any, pathCount: number = 1) => {


        const mnemonicInstance = Mnemonic.fromPhrase(mnemonic);
        const wallet = HDNodeWallet.fromMnemonic(mnemonicInstance, `m/44'/60'/${pathCount - 1}'/0`);



        setEthKeys([
            ...ethKeys,
            {
                publicKey: wallet.publicKey,
                privateKey: wallet.address,
            },
        ])

    }

    const incrementKeys = () => {
        setCount(count + 1)
        generateKeyPair(phrase, count + 1)
    }


    return (
        <>

            {ethKeys.length > 0 ? (
                <>
                    <img
                        className="h-8 w-8 m-8"
                        src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032"
                        alt="Ethereum"
                    />
                    {ethKeys.map((ethKey, i) => (
                        <div key={i}>

                            <Wallet
                                publicKey={ethKey.publicKey}
                                privateKey={ethKey.privateKey}
                            />

                        </div>
                    ))}
                    <Button className="my-8" onClick={incrementKeys}> Add Keys </Button>
                </>

            ) : (
                <>
                    <Button className="flex-1 flex-col shadow-2xl" onClick={() => generateKeyPair(phrase)}>

                        <div >
                            <img className="h-8 w-8 " src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032" alt="Solana" />
                        </div>

                        <div>
                            Show Etherium Keys
                        </div>
                    </Button>


                </>
            )}



        </>

    )

}
