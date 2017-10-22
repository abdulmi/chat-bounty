import {abi, address} from './bounty.js'

var Web3 = require('web3');
var web3 = new Web3();
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var bounty = web3.eth.contract(abi);
var myBounty = bounty.at(address);

module.exports = {
    myBounty,
    address,
    web3
}
