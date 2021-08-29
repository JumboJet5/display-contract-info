import React, {FunctionComponent, useEffect, useState} from "react";
import './index.component.css'
import {IIndex} from "../../core/interfaces/index.interface";
import {IWithContract} from "../../core/interfaces/common.interfaces";
import {getIndex} from "../../core/consts/web3";

type TIndexProps = { indexId: string } & Partial<IWithContract>;

function formateNumber(num: number, option: Intl.NumberFormatOptions): string {
    return num || num === 0 ? num.toLocaleString('en', option) : '-';
}

const IndexComponent: FunctionComponent<TIndexProps> = ({indexId, contract}: TIndexProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<IIndex>(undefined);

    const fetchData = async () => {
        setData(await getIndex(contract, indexId))
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData()
    }, []);

    const convOptions: Intl.NumberFormatOptions = {minimumFractionDigits: 0, maximumFractionDigits: 8}
    const conversation = formateNumber(data?.usdPriceInCents ? +data.usdPriceInCents / 1000 : null, convOptions);

    const capOptions: Intl.NumberFormatOptions = {minimumFractionDigits: 2, maximumFractionDigits: 2}
    const capitalization = formateNumber(data?.usdCapitalization ? +data.usdCapitalization / 100 : null, capOptions);

    return (
        isLoading || !data
            ? <div className="index-card" data-loaded={!isLoading}/>
            : <div className="index-card" data-loaded="true">
                <div className="index-name">{data?.name}</div>
                <div className="index-conversation">$100
                    / {conversation} ETH
                </div>
                <div className="additional-row">
                    <div
                        className="index-capitalization">${capitalization}</div>
                    <div className="index-percentage">{data?.percentageChange}%</div>
                </div>
            </div>
    );
}

export default IndexComponent;
