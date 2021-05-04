import CryptoBlock from './crypto-block.js'

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()]
    this.difficulty = 5
  }

  startGenesisBlock() {
    return new CryptoBlock(0, new Date().getTime(), 'Initial Block in the Chain', '0')
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  addNewBlock(data) {
    const index = this.blockchain.length
    const newBlock = new CryptoBlock(index, new Date().getTime(), data)
    newBlock.precedingHash = this.obtainLatestBlock().hash
    newBlock.proofOfWork(this.difficulty)
    this.blockchain.push(newBlock)
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i]
      const precedingBlock = this.blockchain[i - 1]

      if (currentBlock.hash !== currentBlock.computeHash()) return false
      if (currentBlock.precedingHash !== precedingBlock.hash) return false
    }
    return true
  }
}

export default CryptoBlockchain