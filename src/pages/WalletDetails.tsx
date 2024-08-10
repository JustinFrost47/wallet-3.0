interface walletDetails {
    publicKey?: string,
    privateKey?: string,

}

let sampleAddress = "temp"
let sampleKey = "temp"


export default function WalletDetails({publicKey = sampleKey , privateKey= sampleAddress} : walletDetails) {
  return (
    <div className=" w-full p-8 mx-8 text-white  bg-gray-950 rounded-lg ">
        <div>Public Key: {publicKey}</div>
        <div className="text-wrap">Public Address: {privateKey}</div>
    </div>
  )
}
