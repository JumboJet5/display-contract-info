import { useCallback, useEffect, useState } from "react";
import { IIndex } from "../core/interfaces/index.interface";
import { getIndex } from "../core/consts/web3";
import { Contract } from "web3-eth-contract";
import { cloneFunction } from "../core/consts/clone-function.constant";

export default function useIndex(contract: Contract, indexId: string): [IIndex, (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IIndex>(undefined);

  const fetchData = async () => {
    setData(await getIndex(contract, indexId))
    setIsLoading(false);
  }

  useEffect(() => void fetchData(), [contract, indexId]);
  const reloadIndex = useCallback(cloneFunction(fetchData), [])

  return [data, reloadIndex, isLoading]
}
