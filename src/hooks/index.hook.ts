import { useCallback, useContext, useEffect, useState } from "react";
import { IIndex } from "../core/interfaces/index.interface";
import { getIndex } from "../core/consts/web3";
import { cloneFunction } from "../core/consts/clone-function.constant";
import { ContractContext } from "../components/contract-wrapper/contract-wrapper.component";

export default function useIndex(indexId: string): [IIndex, (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IIndex>(undefined);
  const contract = useContext(ContractContext)

  const fetchData = async () => {
    setData(await getIndex(contract, indexId))
    setIsLoading(false);
  }

  useEffect(() => void fetchData(), [contract, indexId]);
  const reloadIndex = useCallback(cloneFunction(fetchData), [])

  return [data, reloadIndex, isLoading]
}
