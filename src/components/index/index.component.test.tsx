import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import IndexComponent from "./index.component";
import {getContract} from "../../core/consts/web3";
import {IIndex} from "../../core/interfaces/index.interface";


let container: HTMLDivElement = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
it("renders without contract", async () => {
    act(() => {
        render(<IndexComponent indexId="0"/>, container)
    });
    const indexCard1 = container.querySelector(".index-card");
    expect(indexCard1?.getAttribute("data-loaded")).toBe("false");

    await act(() => {
        render(<IndexComponent indexId="0"/>, container)
    });
    const indexCard2 = container.querySelector(".index-card");
    expect(indexCard2?.getAttribute("data-loaded")).toBe("true");
});

it("renders with contract", async () => {
    const contract = await getContract()
    const fakeIndexInfo: IIndex = {
        name: "Test",
        usdPriceInCents: "10",
        ethPriceInWei: "100",
        percentageChange: "1000",
        usdCapitalization: "10000"
    };
    const fakeGetIndex = () => new Promise((resolve) => resolve(fakeIndexInfo));
    jest.spyOn(contract.methods, "getIndex").mockImplementation(() => ({call: fakeGetIndex}));

    act(() => {
        render(<IndexComponent indexId="0" contract={contract}/>, container)
    });

    const indexCard1 = container.querySelector(".index-card");
    expect(indexCard1?.getAttribute("data-loaded")).toBe("false");

    await act(async () => {
        render(<IndexComponent indexId="0" contract={contract}/>, container)
    });

    const indexCard2 = container.querySelector(".index-card");
    expect(indexCard2?.getAttribute("data-loaded")).toBe("true");

    const indexName = container.querySelector(".index-name");
    expect(indexName?.textContent).toBe(fakeIndexInfo.name);

    const indexConversation = container.querySelector(".index-conversation");
    const conversationOptions: Intl.NumberFormatOptions = {minimumFractionDigits: 0, maximumFractionDigits: 8}
    const formattedConversation = (+fakeIndexInfo.usdPriceInCents / 1000).toLocaleString('en', conversationOptions);
    expect(indexConversation?.textContent).toBe(`$100 / ${formattedConversation} ETH`);

    const indexCapitalization = container.querySelector(".index-capitalization");
    const capitalizationOptions: Intl.NumberFormatOptions = {minimumFractionDigits: 2, maximumFractionDigits: 2}
    const formattedCapital = (+fakeIndexInfo.usdCapitalization / 100).toLocaleString('en', capitalizationOptions);
    expect(indexCapitalization?.textContent).toBe(`$${formattedCapital}`);

    const indexPercentage = container.querySelector(".index-percentage");
    expect(indexPercentage?.textContent).toBe(`${fakeIndexInfo.percentageChange}%`);
});
