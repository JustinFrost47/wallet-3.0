
import { toast } from "react-toastify"


interface CopyAreaProp {
    wordSequence? : string
}

let tempSequence = " *temp phrase* embrace birth flag glare smoke own axis morning debris chunk vapor panic"

export default function CopyArea({wordSequence = tempSequence} : CopyAreaProp) {


  const handleClick = () => {

    navigator.clipboard.writeText(wordSequence)
    .then(() => {
      console.log("Text copied to clipboard");
      toast("Mnemonic copied to clipboard")
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
  }

  return (
    <>
    <p className="mt-4 p-4 text-gray-600 font-small">Click Card to Copy Phrase</p>
    <div onClick={handleClick} className="copy-area bg-gray-950 text-white w-1/2 h-40 p-8 m-4 rounded-lg shadow-2xl overflow-scroll ">
        
        {wordSequence}

        {/* <p className="mt-4 p-4 text-gray-600 font-small">Click Card to Copy Phrase</p> */}
    </div>
    </>
  )
}
