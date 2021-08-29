import {Contract} from "web3-eth-contract";

export interface IWithContract {
    contract: Contract
}

export interface IWithLoading {
    isLoading: boolean;
}
