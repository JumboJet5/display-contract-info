import React, { FunctionComponent, useMemo } from 'react';
import './group.component.css'
import IndexComponent from "../index/index.component";
import { IGroup } from "../../core/interfaces/group.interface";
import useGroup from "../../hooks/group.hook";

type TGroupProps = { groupId: string };

const getIndexes = (group: IGroup): JSX.Element[] =>
  group?.indexes?.map(id => <IndexComponent indexId={id} key={id}/>) ?? []

const GroupComponent: FunctionComponent<TGroupProps> = ({ groupId }: TGroupProps) => {
  const [group, , isLoading] = useGroup(groupId);
  const indexes = useMemo(() => getIndexes(group), [group]);

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
