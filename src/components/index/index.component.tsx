import React, { FunctionComponent } from "react";
import './index.component.css'
import { IWithContract } from "../../core/interfaces/common.interfaces";
import useIndex from "../../hooks/index.hook";

type TIndexProps = { indexId: string } & Partial<IWithContract>;

function formateNumber(num: number, option: Intl.NumberFormatOptions): string {
  return num || num === 0 ? num.toLocaleString('en', option) : '-';
}

const IndexComponent: FunctionComponent<TIndexProps> = ({ indexId, contract }: TIndexProps) => {
  const [data, , isLoading] = useIndex(contract, indexId);

  const convOptions: Intl.NumberFormatOptions = { minimumFractionDigits: 0, maximumFractionDigits: 8 }
  const conversation = formateNumber(data?.usdPriceInCents ? +data.usdPriceInCents / 1000 : null, convOptions);

  const capOptions: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  const capitalization = formateNumber(data?.usdCapitalization ? +data.usdCapitalization / 100 : null, capOptions);

  return (
    isLoading || !data
      ? <div className="index-card" data-loaded={!isLoading}/>
      : <div className="index-card" data-loaded="true">
        <div className="index-name">{data?.name}</div>
        <div className="index-conversation">$100 / {conversation} ETH</div>
        <div className="additional-row">
          <div
            className="index-capitalization">${capitalization}</div>
          <div className="index-percentage">{data?.percentageChange}%</div>
        </div>
      </div>
  );
}

export default IndexComponent;
