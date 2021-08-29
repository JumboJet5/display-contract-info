import React from 'react';
import './group.component.css'
import IndexComponent from "../index/index.component";
import {IGroup} from "../../core/interfaces/group.interface";
import {IWithContract, IWithLoading} from "../../core/interfaces/common.interfaces";

type TGroupProps = { groupId: string } & IWithContract;
type TGroupState = { group?: IGroup } & IWithLoading;

class GroupComponent extends React.Component<TGroupProps, TGroupState> {
    constructor(public props: TGroupProps) {
        super(props);
        this.state = {isLoading: true};
    }

    public async componentDidMount(): Promise<void> {
        const group = await this._getGroup(this.props.groupId);
        this.setState({...this.state, group, isLoading: false});
    }

    public render(): JSX.Element {
        const indexes = this.state.group?.indexes
            ?.map(indexId => <IndexComponent indexId={indexId} contract={this.props.contract} key={indexId}/>)
        return (

            this.state.isLoading || !this.state.group
                ? <div className="group" data-loaded={!this.state.isLoading}/>
                : <div className="group" data-loaded="true">
                    <div className="group-title">{this.state.group?.name}</div>
                    <div className="indexes-wrapper">{indexes}</div>
                </div>
        );
    }

    private async _getGroup(id: string): Promise<any> {
        return this.props.contract?.methods.getGroup(id).call()
    }
}

export default GroupComponent;
