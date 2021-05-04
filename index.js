import inquirer from 'inquirer'
import CryptoBlockchain from './src/crypto-blockchain.js'

let simpleBlockchain = new CryptoBlockchain()
console.info('simpleBlockchain is started...')

const questions = [
  {
    type: 'input',
    name: 'sender',
    message: 'Sender name:',
    default: () => 'Anonymous',
  },
  {
    type: 'input',
    name: 'recipient',
    message: 'Recipient name:',
    default: () => 'Anonymous',
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'Quantity:',
    validate: value => {
      if (!isNaN(parseInt(value, 10))) return true
      return 'Please enter number'
    }
  },
  {
    type: 'confirm',
    name: 'addAgain',
    message: 'Want to add more block (just hit enter for YES)?',
    default: true,
  },
]

const ask = () => {
  inquirer
  .prompt(questions)
  .then(answers => {
    console.log('Adding new block...')
    simpleBlockchain.addNewBlock({
      sender: answers.sender,
      recipient: answers.recipient,
      quantity: parseInt(answers.quantity, 10),
    })
    console.log(JSON.stringify(simpleBlockchain, null, 4))
    console.log('Validity of this Blockchain: ', simpleBlockchain.checkChainValidity())
    if (answers.addAgain) {
      ask()
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment")
    } else {
      console.error('Something went wrong: ', error)
    }
  })
}

ask()


