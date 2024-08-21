import { useState } from "react";
import WalletDashboard from "./EthWalletDashboard"
import { toast } from "react-toastify";

interface walletDetails {
  walletName?: string;
  publicKey?: string,
  privateKey?: string,
  address: string

}

let sampleAddress = "temp"
let sampleKey = "temp"



export default function EthWalletCard({ walletName ="Wallet", publicKey = sampleKey, privateKey = sampleAddress, address }: walletDetails) {

  const [openDashboard, setOpenDashboard] = useState(false);



  const showDashboard = () => {
    console.log("hi")
    setOpenDashboard(!openDashboard);
  }

  function turnicatePublicKey(publicKey: string): string {
    return `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`;
}

const copyText = () => {

    navigator.clipboard.writeText(publicKey)
    .then(() => {
      console.log("Text copied to clipboard");
      toast("Key Copied")
  
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
  }
  
  return (
    <>
      <div onClick={showDashboard} className="px-8 py-4 m-8 text-white  bg-gray-800 hover:bg-slate-700 hover:border-blue-950 rounded-lg overflow-scroll shadow-2xl w-80 h-24 flex flex-row  justify-between items-center">


      <img
                        className="h-5 w-5 "
                        src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032"
                        alt="Ethereum"
                    />

      <p >{turnicatePublicKey(publicKey)}</p>

      <span onClick={(e) => { e.stopPropagation(); copyText(); }} >    
        <svg  className="w-9 h-9 ml-8 hover:w-10 hover:h-10 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M6.59961 11.3974C6.59961 8.67119 6.59961 7.3081 7.44314 6.46118C8.28667 5.61426 9.64432 5.61426 12.3596 5.61426H15.2396C17.9549 5.61426 19.3125 5.61426 20.1561 6.46118C20.9996 7.3081 20.9996 8.6712 20.9996 11.3974V16.2167C20.9996 18.9429 20.9996 20.306 20.1561 21.1529C19.3125 21.9998 17.9549 21.9998 15.2396 21.9998H12.3596C9.64432 21.9998 8.28667 21.9998 7.44314 21.1529C6.59961 20.306 6.59961 18.9429 6.59961 16.2167V11.3974Z" fill="#1C274C"></path> 
            <path opacity="0.5" d="M4.17157 3.17157C3 4.34315 3 6.22876 3 10V12C3 15.7712 3 17.6569 4.17157 18.8284C4.78913 19.446 5.6051 19.738 6.79105 19.8761C6.59961 19.0353 6.59961 17.8796 6.59961 16.2167V11.3974C6.59961 8.6712 6.59961 7.3081 7.44314 6.46118C8.28667 5.61426 9.64432 5.61426 12.3596 5.61426H15.2396C16.8915 5.61426 18.0409 5.61426 18.8777 5.80494C18.7403 4.61146 18.4484 3.79154 17.8284 3.17157C16.6569 2 14.7712 2 11 2C7.22876 2 5.34315 2 4.17157 3.17157Z" fill="#1C274C"></path> 
        </g>
    </svg>
    </span>

      </div>
      {/* Conditionally render the WalletDashboard */}
      {openDashboard && (
        <WalletDashboard walletName={walletName} publicKey={publicKey} privateKey={privateKey} address={address} visible={openDashboard} setVisible={setOpenDashboard}/>
      )}
    </>
  )
}
