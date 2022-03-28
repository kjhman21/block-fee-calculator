# Block fee calculator

This source calculates block fee.

```
$ node index.js <startBlockNumber> <endBlockNumber>
(start,end) = (86577750,86577753)
blockNumber,gasReward(peb),ToBeBurnt(peb),gasReward(KLAY),ToBeBurnt(KLAY)
86577750,39029000000000000,0,0.039029,0
86577751,48361100000000000,0,0.0483611,0
86577752,56653700000000000,0,0.0566537,0
86577753,37426300000000000,0,0.0374263,0
Total Reward = 181470100000000000, 0.1814701 KLAY
Total KLAY to be burnt = 0, 0.1814701 KLAY
```