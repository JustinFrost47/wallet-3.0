

interface WalletDashboardProps {
    walletName?: string;
    publicKey?: string;
    privateKey?: string;
    visible: boolean;
    setVisible: Function;
}

let sampleAddress = "temp";
let sampleKey = "temp";
let sampleName = "Wallet"

export default function WalletDashboard({ walletName = sampleName, publicKey = sampleKey, privateKey = sampleAddress, visible, setVisible}: WalletDashboardProps) {
    // State to control the visibility of the dashboard


    // Handler to close the dashboard
    const handleClose = () => {

        setVisible(false);
    };

    // If not visible, don't render anything
    if (!visible) return null;

    return (
        <>
            {visible && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg w-10/12  h-5/6">
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-700 bg-red-600 px-4 py-2 rounded-lg"
                            onClick={handleClose}
                        >
                            x
                        </button>
                        <div className="text-center text-white">
                            <h1>{walletName}</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
