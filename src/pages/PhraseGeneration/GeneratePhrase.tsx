import { Button } from '../../components/ui/button'
import CopyArea from './CopyArea'


import { generateMnemonic } from 'bip39';

interface GeneratePhraseProp {
    phrase: string,
    setPhrase: Function,
    setContinueFlag: Function,
    setMode: Function,
}


export default function GeneratePhrase({phrase, setPhrase, setContinueFlag, setMode} : GeneratePhraseProp ) {



    const createPhrase = () => {

        const mnemonic = generateMnemonic();
        // localStorage.setItem('mnemonic', mnemonic)
        setPhrase(mnemonic)
        setMode("generate")
        // console.log('Generated Mnemonic:', mnemonic);
    }

    const refreshPage = () => {
        setContinueFlag(true)
    }

    return (

        <>
            {phrase ?
                (<>
                <CopyArea wordSequence={phrase} />
                <Button className="my-8" onClick={refreshPage}>Continue</Button>
                </>)
                : (
                    <Button className="my-8" onClick={createPhrase}>Generate Mnemonic</Button>
                )}

        </>

    )
}
