import React, { FunctionComponent, useMemo } from 'react';
import './group.component.css'
import IndexComponent from "../index/index.component";
import { IGroup } from "../../core/interfaces/group.interface";
import { IWithContract } from "../../core/interfaces/common.interfaces";
import { Contract } from "web3-eth-contract";
import useGroup from "../../hooks/group.hook";

type TGroupProps = { groupId: string } & IWithContract;

const getIndexes = (contract: Contract, group: IGroup): JSX.Element[] =>
  group?.indexes?.map(id => <IndexComponent indexId={id} contract={contract} key={id}/>) ?? []

const GroupComponent: FunctionComponent<TGroupProps> = ({ groupId, contract }: TGroupProps) => {
  const [group, , isLoading] = useGroup(contract, groupId);
  const indexes = useMemo(() => getIndexes(contract, group), [contract, group]);

  return (
    isLoading || !group
      ? <div className="group" data-loaded={!isLoading}/>
      : <div className="group" data-loaded="true">
        <div className="group-title">{group?.name}</div>
        <div className="indexes-wrapper">{indexes}</div>
      </div>
  );
}

export default GroupComponent;
