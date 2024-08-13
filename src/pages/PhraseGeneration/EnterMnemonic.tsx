import { Button } from '../../components/ui/button'
import { Textarea } from "../../components/ui/textarea"
import { useState } from 'react'

interface EnterMnemonicProp {
    setPhrase: Function,
    setContinueFlag: Function,
    setMode: Function,
}

export default function EnterMnemonic({ setPhrase, setContinueFlag, setMode }: EnterMnemonicProp) {

    const [mnemonic, setMnemonic] = useState('');
    const [openText, setOpenText] = useState(false)


    const handleConfirm = () => {

        setPhrase(mnemonic);
        setContinueFlag(true)

    }

    const handleChange = (event: any ) => {

        setMnemonic(event.target.value);


    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

        
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents new lines in the textarea
            
            handleConfirm();
        }
    };

    const openTextArea = () => {


        console.log("temp")
        setOpenText(true)
        setMode("enter")

    }

    return (
        <>
            {openText ? (
                <div className="mnemonic-field grid w-full gap-2">
                    <Textarea

                        
                        className=' bg-slate-700 text-white shadow-xl'
                        placeholder="Enter My own Mnemonic Phrase"
                        value={mnemonic}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    <Button className="my-8" onClick={handleConfirm} >Confirm</Button>
                </div>
            ) : (
                <Button className="my-8" onClick={openTextArea}>Enter Phrase</Button>
            )}
        </>
    )
}
