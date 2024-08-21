import { useEffect, useState } from "react";

import SolWallet from "./SolWallet";
import ReceivePannel from "../ReceivePannel";
import SendSolPannel from './SendSolPannel'




interface WalletDashboardProps {
    walletName?: string;
    publicKey?: string;
    privateKey?: string;
    visible: boolean;
    setVisible: Function;
}

let sampleAddress = "temp";
let sampleKey = "temp";
let sampleName = "Wallet"

export default function WalletDashboard({ walletName = sampleName, publicKey = sampleKey, privateKey = sampleAddress, visible, setVisible }: WalletDashboardProps) {
    // State to control the visibility of the dashboard

    const [balance, setBalance] = useState(0)
    const [receiveVisible, setRecevieVisible] = useState(false)
    const [sendVisible, setSendVisible] = useState(false)

    const CurrentWallet : SolWallet= new SolWallet(publicKey, privateKey)

    useEffect(() => {

        
        // CurrentWallet.sendTransaction(0.001, "6BRGWmJXisQKGR2BL1X9RxLkRpceRd522AbUApmetrgF" )

        CurrentWallet.getBalance()
        .then((res) => {
            console.log(res)
            
            setBalance(res)
        })

    }, [])

    // Handler to close the dashboard
    const handleClose = () => {

        setVisible(false);
    };

    const toggleReceivePannel = () => {
        setRecevieVisible(!receiveVisible)
    }

    const toggleSendPannel = () => {
        setSendVisible(!sendVisible)
    }


    // If not visible, don't render anything
    if (!visible) return null;

    return (
        <>
            {visible && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg w-10/12  h-5/6">
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-700 hover:bg-red-600 px-3 py-1 rounded-full"
                            onClick={handleClose}
                        >
                            x
                        </button>
                        <div className="text-center text-white">
                            <p className="text-2xl">{walletName}</p>
                            <div className="balance text-5xl p-4 m-4 font-bold my-16"> 
                                <p>{balance } SOL</p> 

                            </div>
                            
                            <div className="actions flex flex-row justify-center items-center  ">

                                <span className="receive flex flex-col items-center m-4 p-4">
                                    <div onClick={toggleReceivePannel} className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black m-2">
                                    <svg style={{ transform: "rotate(180deg)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 17L12 8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 11L12 7L8 11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </div>
                                    <p>Recieve</p>
                                </span>


                                <span className="send flex flex-col items-center m-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 hover:bg-black m-2 ">
                                    <svg onClick={toggleSendPannel} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 17L12 8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 11L12 7L8 11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </div>
                                    <p>Send</p>
                                </span>

                            </div>

                            <p className="absolute inset-x-0 bottom-0 text-sm font-light p-1 my-4" >Low on money ?   
                                    <a className=" underline" href="https://faucet.solana.com/" target="blank"> send airdrop on Devnet</a> 
                            </p>

                        </div>
                    </div>
                    {receiveVisible && <ReceivePannel publicKey={publicKey} visible={receiveVisible} setVisible={setRecevieVisible}/> }
                    {sendVisible && <SendSolPannel publicKey={publicKey} visible={sendVisible} setVisible={setSendVisible}/>}
                </div>
            )}
        </>
    );
}
