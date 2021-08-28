import React from "react";
import {Contract} from "web3-eth-contract";

interface IIndex {
    ethPriceInWei: string;
    name: string;
    percentageChange: string;
    usdCapitalization: string;
}

class IndexComponent extends React.Component<{ indexId: string, contract?: Contract }, { data?: IIndex, isLoading: boolean }> {
    constructor(props: { indexId: string, contract?: Contract }) {
        super(props);
        this.state = {isLoading: true};
    }

    public async componentDidMount(): Promise<void> {
        const data = await this._getIndexData(this.props.indexId);
        this.setState({...this.state, data, isLoading: false});
    }

    public render(): JSX.Element {
        return (
            <div>
                <h3>{this.state.data?.name}</h3>
                <div>{this.state.data?.ethPriceInWei}</div>
                <div>{this.state.data?.percentageChange}</div>
                <div>{this.state.data?.usdCapitalization}</div>
            </div>
        );
    }

    private async _getIndexData(indexId: string): Promise<IIndex> {
        return this.props.contract?.methods.getIndex(indexId).call()
    }
}

export default IndexComponent;
