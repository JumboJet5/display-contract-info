import React, { FunctionComponent, useMemo } from 'react';
import { Contract } from 'web3-eth-contract';
import './App.css';
import GroupComponent from './components/group/group.component';
import HeaderComponent from "./components/header/header.component";
import useContract from "./hooks/contract.hook";

const getGroups = (contract: Contract, groupIds: string[]): JSX.Element[] =>
  groupIds?.map(groupId => <GroupComponent groupId={groupId} contract={contract} key={groupId}/>) ?? []

const App: FunctionComponent = () => {
  const [contract, groupIds, , isLoading] = useContract();
  const groups = useMemo(() => getGroups(contract, groupIds), [contract, groupIds]);

  return (
    <div className="app">
      <HeaderComponent/>
      <h1>All Indexes</h1>
      <div className="groups-wrapper" data-loaded={!isLoading}>{groups}</div>
    </div>
  );
}

export default App;
