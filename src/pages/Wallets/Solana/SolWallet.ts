import axios from "axios";
import { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

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

    sendTransaction (amount : number, toKey : string) {

    const connection = new Connection(import.meta.env.VITE_SOL_URL, 'confirmed');

    const privateKeyUint8Array = bs58.decode(this.privateKey);
    const fromKeypair = Keypair.fromSecretKey(privateKeyUint8Array);
    

    const toPublicKey = new PublicKey(toKey);


    const amountInSol = amount;


    const lamports = amountInSol * LAMPORTS_PER_SOL;


    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromKeypair.publicKey,
            toPubkey: toPublicKey,
            lamports: lamports,
        })
    );


    try {
        sendAndConfirmTransaction(connection, transaction, [fromKeypair])
        .then((signature) => {
            console.log('Transaction successful with signature:', signature);
        })
        
    } catch (error) {
        console.error('Transaction failed:', error);
    }

    }


    validatePublicKey (keyToCheck: string) {

        const key = new PublicKey(keyToCheck);
        // Lies on the ed25519 curve and is suitable for users
        const isPublicKey = PublicKey.isOnCurve(key.toBytes())
        return isPublicKey
    }

}