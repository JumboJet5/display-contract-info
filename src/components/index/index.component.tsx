import React from "react";
import './index.component.css'
import {Contract} from "web3-eth-contract";

interface IIndex {
    ethPriceInWei: string;
    name: string;
    percentageChange: string;
    usdCapitalization: string;
    usdPriceInCents: string;
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
            <div className="index-card">
                <div className="index-name">{this.state.data?.name}</div>
                <div className="index-conversation">$100
                    / {this._getConversation(this.state.data?.usdPriceInCents)} ETH
                </div>
                <div className="additional-row">
                    <div className="index-capitalization">{this._getCapitalizations(this.state.data?.usdCapitalization)}</div>
                    <div className="index-percentage">{this.state.data?.percentageChange}%</div>
                </div>
            </div>
        );
    }

    private async _getIndexData(indexId: string): Promise<IIndex> {
        return this.props.contract?.methods.getIndex(indexId).call()
    }

    private _getConversation(priceInCents?: string,
                             options: Intl.NumberFormatOptions = {
                                 minimumFractionDigits: 0,
                                 maximumFractionDigits: 8
                             }): string {
        return priceInCents ? (+priceInCents / 1000).toLocaleString('en', options) : '-';
    }

    private _getCapitalizations(priceInCents?: string,
                                options: Intl.NumberFormatOptions = {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 8
                                }): string {
        return priceInCents ? (+priceInCents / 100).toLocaleString('en', options) : '-';
    }
}

export default IndexComponent;
