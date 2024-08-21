import { useEffect, useState } from "react";
import ReceivePannel from "../ReceivePannel";
import EthWallet from './EthWallet'

interface WalletDashboardProps {
    walletName?: string;
    publicKey?: string;
    address: string;
    privateKey?: string;
    visible: boolean;
    setVisible: Function;
}

let sampleAddress = "temp";
let sampleKey = "temp";
let sampleName = "Wallet"

export default function WalletDashboard({ walletName = sampleName, publicKey = sampleKey, privateKey = sampleAddress, address, visible, setVisible }: WalletDashboardProps) {
    // State to control the visibility of the dashboard


    const [receiveVisible, setRecevieVisible] = useState(false)
    const [balance, setBalance]  = useState(0)

    
    const CurrentWallet : EthWallet = new EthWallet(privateKey, publicKey, address)
    CurrentWallet.print()

    useEffect(() => {

        refreshBalance()

    }, [])

    const refreshBalance = () => {

        console.log('hi')
        CurrentWallet.getBalance()
            .then((res) => {
                console.log(res)

                setBalance(res)
            })

    }
    
    // Handler to close the dashboard
    const handleClose = () => {

        setVisible(false);
    };

    const toggleReceivePannel = () => {
        setRecevieVisible(!receiveVisible)
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
                                <p>{balance} ETH</p> 

                            </div>
                            
                            <div  className="actions flex flex-row justify-center items-center  ">

                                <span onClick={toggleReceivePannel} className="receive flex flex-col items-center m-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black m-2">
                                    <svg style={{ transform: "rotate(180deg)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 17L12 8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 11L12 7L8 11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </div>
                                    <p>Recieve</p>
                                </span>

                                <span className="send flex flex-col items-center m-4 p-4">
                                    <div onClick={refreshBalance} className="w-12 h-12 rounded-full bg-slate-900 hover:bg-black m-2 p-2">
                                        <svg
                                            fill="#1E293B"
                                            version="1.1"
                                            id="Layer_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 383.748 383.748"
                                        >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"></path>
                                                    <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <p>Refresh Balance</p>
                                </span>


                                <span className="send flex flex-col items-center m-4 p-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-900 hover:bg-black m-2 ">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 17L12 8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 11L12 7L8 11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </div>
                                    <p>Send</p>
                                </span>

                            </div>

                            <p className="absolute inset-x-0 bottom-0 text-sm font-light p-1 my-4" >Low on money ?   
                                    <a className=" underline" href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia" target="blank"> send airdrop on Sepolia</a> 
                            </p>

                        </div>
                    </div>
                    {receiveVisible && <ReceivePannel publicKey={address} visible={receiveVisible} setVisible={setRecevieVisible}/> }
                </div>
            )}
        </>
    );
}
