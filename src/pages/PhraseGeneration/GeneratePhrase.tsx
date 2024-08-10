import { useState } from 'react';
import { Button } from '../../components/ui/button'
import CopyArea from './CopyArea'


import { generateMnemonic } from 'bip39';


export default function GeneratePhrase() {

    const [phrase, setPhrase] = useState('')

    const createPhrase = () => {

        const mnemonic = generateMnemonic();
        localStorage.setItem('mnemonic', mnemonic)
        setPhrase(mnemonic)
        // console.log('Generated Mnemonic:', mnemonic);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (

        <>
            {phrase ?
                (<>
                <CopyArea wordSequence={phrase} />
                <Button onClick={refreshPage}>Continue</Button>
                </>)
                : (
                    <Button onClick={createPhrase}>Generate Mnemonic</Button>
                )}

        </>

    )
}
