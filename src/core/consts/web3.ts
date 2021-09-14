import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import contractInterface from "./contract-interafce";
import {IGroup} from "../interfaces/group.interface";
import {IIndex} from "../interfaces/index.interface";

export function getContract(): Promise<Contract> {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/de380f8bd2974504900acebf4cabcec6'));
    return web3.eth.net.isListening()
        .then(() => new web3.eth.Contract(contractInterface, '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29'))
        .catch(e => {
            console.error('Wow. Something went wrong:', e);
            throw e;
        });
}

export function getGroupIds(contract: Contract): Promise<string[]> {
    return contract?.methods.getGroupIds().call();
}

export function getGroup(contract: Contract, groupId: string): Promise<IGroup> {
    return contract?.methods.getGroup(groupId).call();
}

export function getIndex(contract: Contract, indexId: string): Promise<IIndex> {
    return contract?.methods.getIndex(indexId).call();
}
