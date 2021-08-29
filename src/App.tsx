import React from 'react';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
import './App.css';
import GroupComponent from './components/group/group.component';
import HeaderComponent from "./components/header/header.component";
import {getContract} from "./core/consts/web3";

class App extends React.Component<{}, { contract?: Contract, groupIds: string[], web3?: Web3, isLoading: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {groupIds: [], isLoading: true};
    }

    public async componentDidMount(): Promise<void> {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/de380f8bd2974504900acebf4cabcec6'));
        const contract = await getContract();
        const groupIds: string[] = await contract.methods.getGroupIds().call()
        this.setState({groupIds, contract, web3, isLoading: false});
    }

    public render(): JSX.Element {
        const groups = this.state.groupIds
            ?.map(groupId => <GroupComponent groupId={groupId} contract={this.state.contract} key={groupId}/>)
        return (
            <div className="app">
                <HeaderComponent/>
                <h1>All Indexes</h1>
                <div className="groups-wrapper" data-loaded={!this.state.isLoading}>{groups}</div>
            </div>
        );
    }
}


export default App;
