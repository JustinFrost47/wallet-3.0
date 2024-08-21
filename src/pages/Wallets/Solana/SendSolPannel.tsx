
import { Button } from "@/components/ui/button";
import {Input} from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { useState } from "react";


import { toast } from "react-toastify";







interface ReceivePannelProps {

    publicKey: string;
    visible: boolean;
    setVisible: any;

}



export default function ReceivePannel({ publicKey = "temp", visible, setVisible }: ReceivePannelProps) {
    // State to control the visibility of the dashboard
    const [amount, setAmount] = useState("")
    const [toAddress, setToAddress] = useState<string>("")

    // Handler to close the dashboard
    const handleClose = () => {

        setVisible(false);
    };

    // Handler for sending the transaction
    const sendTransaction = () => {
        console.log("Sending SOL to", toAddress, "Amount:", amount);
        // Add logic to send the transaction here
    };

    // Handler for changing the amount
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    // Handler for changing the toAddress
    const handleToAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToAddress(e.target.value);
    };


    // If not visible, don't render anything
    if (!visible) return null;

    return (
        <>
            {visible && (
                <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg w-10/12  h-5/6 flex flex-col  items-center">
                        <button
                            className="absolute top-2 left-2 text-white hover:text-gray-700 bg-slate-900 hover:bg-black px-3 py-1 rounded-full m-4 p-4 w-12 h-12"
                            onClick={handleClose}
                        >
                            <svg style={{ transform: "rotate(270deg)" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 17L12 8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 11L12 7L8 11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>


                        <div className="text-center text-white flex flex-col justify-center items-center ">
                            <p className="text-2xl">Send</p>


                            <Label htmlFor="amount">Enter Amount</Label>
                            <Input
                                className="bg-slate-700 border-slate-800"
                                value={amount}
                                onChange={handleAmountChange}
                                type="text"
                                placeholder="SOL"
                                id="amount"
                            />

                            <Label htmlFor="toAddress">Enter Receiver's public key</Label>
                            <Input
                                className="bg-slate-700 border-slate-800"
                                value={toAddress}
                                onChange={handleToAddressChange}
                                type="text"
                                placeholder="Address"
                                id="toAddress"
                            />
                            


                            <Button onClick={sendTransaction}>Send Solana</Button>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
