import axios from "axios";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default class SolWallet {
    publicKey : string
    privateKey : string
    readonly url: string = import.meta.env.VITE_SOL_URL;

    constructor(publicKey : string, privateKey : string) {
        this.publicKey = publicKey;
        this.privateKey = privateKey

    }

    getAccountInfo() {
        return axios.post(this.url, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getAccountInfo",
            "params": [this.publicKey]
          })
        .then((response) => {
            return response
        })
    }

    getBalance() : Promise<number> {
        return axios.post(this.url, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [this.publicKey]
        })
        .then((response) => {
            // console.log(response)
            return response.data.result.value / LAMPORTS_PER_SOL
        })
        .catch(() => {
            return NaN
        })
        
        
    }

    // sendTransaction(amount : number) {
    //     return axios.post(this.url, {
    //         "jsonrpc": "2.0",
    //         "id": 1,
    //         "method": "getBalance",
    //         "params": [this.publicKey]
    //     })
    //     .then((response) => {
    //         // console.log(response)
    //         return response.data.result.value / LAMPORTS_PER_SOL
    //     })
    //     .catch(() => {
    //         return NaN
    //     })

    // }

}