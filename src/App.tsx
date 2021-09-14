import React, { FunctionComponent } from 'react';
import './App.css';
import HeaderComponent from "./components/header/header.component";
import ContractWrapperComponent from "./components/contract-wrapper/contract-wrapper.component";
import GroupsWrapperComponent from "./components/groups-wrapper/groups-wrapper.component";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <HeaderComponent/>
      <h1>All Indexes</h1>
      <ContractWrapperComponent>
        <GroupsWrapperComponent/>
      </ContractWrapperComponent>
    </div>
  );
}

export default App;
