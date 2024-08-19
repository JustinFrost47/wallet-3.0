interface walletDetails {
    publicKey?: string,
    privateKey?: string,

}

let sampleAddress = "temp"
let sampleKey = "temp"


export default function WalletDetails({publicKey = sampleKey , privateKey= sampleAddress} : walletDetails) {
  return (
    <div className=" w-full p-8 m-8 text-white  bg-gray-950 rounded-lg overflow-scroll shadow-2xl">
        <div>Public Key: {publicKey}</div>
        <div className="text-wrap my-4">Private Key: 
          <span className="bg-white hover:bg-gray-950 px-4 mx-2 rounded-sm"> {privateKey}</span>
          </div>
    </div>
  )
}
