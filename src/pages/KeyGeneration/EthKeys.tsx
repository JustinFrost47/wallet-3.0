import { useState } from "react"
import { Button } from "../../components/ui/button"
import WalletDetails from "../WalletDetails";


import { HDNodeWallet,  Mnemonic} from "ethers";



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


    const [ethKeys, setEthKeys] = useState<EthKeys>({publicKey: "", privateKey: ""})

    const generateKeyPair = (mnemonic : any) => {
        

    const mnemonicInstance = Mnemonic.fromPhrase(mnemonic);
        const hdNode =  HDNodeWallet.fromMnemonic(mnemonicInstance, "m/44'/60'/0'/0");
        const wallet = hdNode.derivePath(`1`);


    setEthKeys({
        publicKey: wallet.publicKey,
        privateKey: wallet.address,
    })
}


    return (
        <>

            {ethKeys.publicKey && ethKeys.privateKey ? (


                <>
                    <div >
                        <img className="h-8 w-8 m-8" src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032" alt="Solana" />
                    </div>
                    <WalletDetails publicKey={ethKeys.publicKey} privateKey={ethKeys.privateKey} />
                </>

            ) : (
                <Button className="flex-1 flex-col shadow-2xl" onClick={() => generateKeyPair(phrase)}>

                    <div >
                        <img className="h-8 w-8 " src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032" alt="Solana" />
                    </div>

                    <div>
                        Show Etherium Keys
                    </div>
                </Button>
            )}



        </>

    )

}
