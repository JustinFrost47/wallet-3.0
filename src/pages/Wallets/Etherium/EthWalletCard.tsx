import { useState } from "react";
import WalletDashboard from "./EthWalletDashboard"

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

  return (
    <>
      <div onClick={showDashboard} className=" w-full p-8 m-8 text-white  bg-gray-950 rounded-lg overflow-scroll shadow-2xl">
        <div>Public Key: {publicKey}</div>
        <div>Wallet Address: {address}</div>
        <div className="text-wrap my-4">Private Key:
          <span className="bg-white hover:bg-gray-950 px-4 mx-2 rounded-sm"> {privateKey}</span>
        </div>



      </div>
      {/* Conditionally render the WalletDashboard */}
      {openDashboard && (
        <WalletDashboard walletName={walletName} publicKey={publicKey} privateKey={privateKey} address={address} visible={openDashboard} setVisible={setOpenDashboard}/>
      )}
    </>
  )
}