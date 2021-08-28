import React from 'react';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
import './App.css';
import GroupComponent from './components/group/group.component';
import contractInterface from './core/consts/contract-interafce';
import HeaderComponent from "./components/header/header.component";

class App extends React.Component<{}, {contract?: Contract, groupIds: string[], web3?: Web3, isLoading: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {groupIds: [], isLoading: true};
    }

    public async componentDidMount(): Promise<void> {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/de380f8bd2974504900acebf4cabcec6'));
        let contract: Contract;
        web3.eth.net.isListening()
            .then(() => {
                contract = new web3.eth.Contract(contractInterface, '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29');
                return contract.methods.getGroupIds().call()
            })
            .then((groupIds: string[]) => this.setState({groupIds, contract, web3, isLoading: false}))
            .catch(e => console.error('Wow. Something went wrong:', e));
    }

    public render(): JSX.Element {
        const groups = this.state.groupIds
            ?.map(groupId => <GroupComponent groupId={groupId} contract={this.state.contract} key={groupId}/>)
        return (
            <div className="app">
                <HeaderComponent/>
                <h1>All Indexes</h1>
                {groups}
            </div>
        );
    }
}


export default App;
