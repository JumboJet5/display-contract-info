import React from 'react';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
import './App.css';

function App() {
    return (
        <div className="App">

        </div>
    );
}

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/de380f8bd2974504900acebf4cabcec6'));
let contract: Contract;
web3.eth.net.isListening()
    .then(() => {
        contract = new web3.eth.Contract([{
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "constant": true,
            "inputs": [],
            "name": "getGroupIds",
            "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "uint256", "name": "_groupId", "type": "uint256"}],
            "name": "getGroup",
            "outputs": [{"internalType": "string", "name": "name", "type": "string"}, {
                "internalType": "uint256[]",
                "name": "indexes",
                "type": "uint256[]"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "uint256", "name": "_indexId", "type": "uint256"}],
            "name": "getIndex",
            "outputs": [{"internalType": "string", "name": "name", "type": "string"}, {
                "internalType": "uint256",
                "name": "ethPriceInWei",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "usdPriceInCents", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "usdCapitalization",
                "type": "uint256"
            }, {"internalType": "int256", "name": "percentageChange", "type": "int256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }], '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29');
        return contract.methods.getGroupIds().call()
    })
    .then((ids: string[]) => {
        return Promise.all(ids.map(id => contract.methods.getGroup(id).call()))
    })
    .then((results: {indexes: string[], name: string}[]) => {
        return Promise.all(results[0]?.indexes.map(index => contract.methods.getIndex(index).call()))
    })
    .then(console.log)
    .catch(e => console.log('Wow. Something went wrong: '+ e));
export default App;
