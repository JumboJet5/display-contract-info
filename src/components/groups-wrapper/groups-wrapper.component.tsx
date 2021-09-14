import GroupComponent from "../group/group.component";
import React, { FunctionComponent, useMemo } from "react";
import useGroupIds from "../../hooks/group-ids.hook";
import './groups-wrapper.component.css';

const getGroups = (groupIds: string[]): JSX.Element[] =>
  groupIds?.map(groupId => <GroupComponent groupId={groupId} key={groupId}/>) ?? []

const GroupsWrapperComponent: FunctionComponent = () => {
  const [groupIds, , isLoading] = useGroupIds();
  const groups = useMemo(() => getGroups(groupIds), [groupIds]);

  return (<div className="groups-wrapper" data-loaded={!isLoading}>{groups}</div>);
}

export default GroupsWrapperComponent;
