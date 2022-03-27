const fs = require('fs')
const Caver = require('caver-js')
const caver = new Caver('https://public-node-api.klaytnapi.com/v1/cypress')

const mintedKLAY = caver.utils.convertToPeb('9.6', 'KLAY')

async function getBlockFee(startBlockNumber, endBlockNumber) {
    console.log('blockNumber,gasReward(peb),ToBeBurnt(peb),gasReward(KLAY),ToBeBurnt(KLAY)')
    for(var i = startBlockNumber; i <= endBlockNumber; i++) {
        const b = await caver.rpc.klay.getBlockByNumber(i)
        const gasPrice = await caver.rpc.klay.getGasPriceAt(i)
        const gasReward = caver.utils.toBN(b.gasUsed).mul(caver.utils.toBN(gasPrice))
        const gasRewartAt25ston = caver.utils.toBN(b.gasUsed).mul(caver.utils.toBN(caver.utils.convertToPeb('25','ston')))
        const toBeBurnt = gasReward.sub(gasRewartAt25ston)
        const gasRewardInKLAY = caver.utils.convertFromPeb(gasReward)
        const toBeBurntInKLAY = caver.utils.convertFromPeb(toBeBurnt)
        console.log(`${i},${gasReward.toString()},${toBeBurnt.toString()},${gasRewardInKLAY},${toBeBurntInKLAY}`)
    }
}


async function main() {
    const latestBlockNumber = caver.utils.hexToNumber(await caver.rpc.klay.getBlockNumber())
    var startBlockNumber = 0
    var endBlockNumber = 0

    if(process.argv[2] === undefined) {
        startBlockNumber = latestBlockNumber
        endBlockNumber = latestBlockNumber
    } else {
        startBlockNumber = parseInt(process.argv[2])
        endBlockNumber = parseInt(process.argv[3])

        if(endBlockNumber < startBlockNumber) {
            throw `end block number is smaller than start block number! startBlockNumber=${startBlockNumber}, endBlockNumber=${endBlockNumber}`
        }
    }

    console.log(`(start,end) = (${startBlockNumber},${endBlockNumber})`)

    getBlockFee(startBlockNumber, endBlockNumber)
}

main()