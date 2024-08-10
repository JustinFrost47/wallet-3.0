interface walletDetails {
    publicKey?: string,
    address?: string,

}

let sampleAddress = "adsf32rdaf"
let sampleKey = "dkfsjljsdkf"


export default function WalletDetails({publicKey = sampleKey , address= sampleAddress} : walletDetails) {
  return (
    <div className=" w-full p-8 mx-8 text-white  bg-gray-950 rounded-lg">
        <div>Public Key: {publicKey}</div>
        <div>Public Address: {address}</div>
    </div>
  )
}
