import React, {FunctionComponent, useEffect, useState} from 'react';
import {Contract} from 'web3-eth-contract';
import './App.css';
import GroupComponent from './components/group/group.component';
import HeaderComponent from "./components/header/header.component";
import {getContract, getGroupIds} from "./core/consts/web3";

const App: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [contract, setContract] = useState<Contract>(undefined);
    const [groupIds, setGroupIds] = useState<string[]>([]);

    const fetchContract = async () => {
        const fetchedContract = await getContract();
        setContract(fetchedContract);
        setGroupIds(await getGroupIds(fetchedContract));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchContract()
    }, []);

    const groups = groupIds
        ?.map(groupId => <GroupComponent groupId={groupId} contract={contract} key={groupId}/>)
    return (
        <div className="app">
            <HeaderComponent/>
            <h1>All Indexes</h1>
            <div className="groups-wrapper" data-loaded={!isLoading}>{groups}</div>
        </div>
    );
}

export default App;
