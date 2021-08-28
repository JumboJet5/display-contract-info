import React from 'react';
import {Contract} from 'web3-eth-contract';
import './group.component.css'
import IndexComponent from "../index/index.component";

interface IGroup {
    indexes: string[];
    name: string;
}

class GroupComponent extends React.Component<{ groupId: string, contract?: Contract }, { group?: IGroup, isLoading: boolean }> {
    constructor(public props: { groupId: string, contract?: Contract }) {
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
            <div className="group">
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
