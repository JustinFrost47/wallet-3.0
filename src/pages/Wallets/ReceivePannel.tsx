
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";






interface ReceivePannelProps {

    publicKey?: string;
    visible: boolean;
    setVisible: any;

}



export default function ReceivePannel({ publicKey = "temp", visible, setVisible }: ReceivePannelProps) {
    // State to control the visibility of the dashboard


    // Handler to close the dashboard
    const handleClose = () => {

        setVisible(false);
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(publicKey)
            .then(() => {
                console.log("Address Copied to clipboard");
                toast("Address Copied to clipboard")
            })
            .catch(() => {
                toast.error("Couldnt copy address")
            });
    }



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


                        <div className="text-center text-white">
                            <p className="text-2xl">Receive</p>


                            <div className="max-w-16 w-full mx-auto flex flex-col  items-center">
                                <QRCode
                                    size={256}
                                    className="m-12 p-4"
                                    value={publicKey}
                                    viewBox="0 0 256 256"
                                />
                            </div>


                            
                            <div className="balance text-xl p-4 m-4 font-bold my-16 w-11/12  overflow-scroll bg-gray-950 rounded-md">
                                <p>{publicKey}</p>

                            </div>

                            <Button onClick={copyAddress}>Copy Address</Button>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
