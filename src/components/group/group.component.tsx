import React, {FunctionComponent, useEffect, useState} from 'react';
import './group.component.css'
import IndexComponent from "../index/index.component";
import {IGroup} from "../../core/interfaces/group.interface";
import {IWithContract} from "../../core/interfaces/common.interfaces";
import {getGroup} from "../../core/consts/web3";

type TGroupProps = { groupId: string } & IWithContract;

const GroupComponent: FunctionComponent<TGroupProps> = ({groupId, contract}: TGroupProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [group, setGroup] = useState<IGroup>(undefined);

    const fetchGroup = async () => {
        setGroup(await getGroup(contract, groupId))
        setIsLoading(false);
    }

    useEffect(() => {
        fetchGroup()
    }, []);

    const indexes = group?.indexes?.map(id => <IndexComponent indexId={id} contract={contract} key={id}/>)

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
