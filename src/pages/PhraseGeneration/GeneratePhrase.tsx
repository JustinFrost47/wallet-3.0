import { Button } from '../../components/ui/button'
import CopyArea from './CopyArea'


import { generateMnemonic } from 'bip39';


export default function GeneratePhrase() {

  const createPhrase = () => {

    const mnemonic = generateMnemonic();
    console.log('Generated Mnemonic:', mnemonic);
  }

  return (
    <>
            <Button onClick={createPhrase}>Generate Mnemonic</Button>
            <CopyArea/>
    </>
  )
}
