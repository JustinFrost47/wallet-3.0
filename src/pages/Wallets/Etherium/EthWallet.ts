import axios from "axios";

export default class SolWallet {
    publicKey : string
    privateKey : string
    address: string

    readonly url: string = import.meta.env.VITE_ETH_URL;

    constructor(publicKey : string, privateKey : string, address :string) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.address = address

    }

    print() {
        console.log(`${this.publicKey} ${this.privateKey} ${this.address}`)
    }


    getBalance() : Promise<number> {
        return axios.post(this.url, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_getBalance",
            "params": [this.address, "latest"]
        })
        .then((response) => {
            console.log(response)
            return parseInt(response.data.result, 16) / Math.pow(10, 18)
        })
        .catch(() => {
            return NaN
        })
        
        
    }



}