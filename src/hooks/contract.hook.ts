import { useCallback, useEffect, useState } from "react";
import { Contract } from "web3-eth-contract";
import { getContract, getGroupIds } from "../core/consts/web3";
import { cloneFunction } from "../core/consts/clone-function.constant";

export default function useContract(): [Contract, string[], (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contract, setContract] = useState<Contract>(undefined);
  const [groupIds, setGroupIds] = useState<string[]>([]);

  const fetchContract = async () => {
    const fetchedContract = await getContract();
    setContract(fetchedContract);
    setGroupIds(await getGroupIds(fetchedContract));
    setIsLoading(false);
  }

  useEffect(() => void fetchContract(), []);
  const reloadContract = useCallback(cloneFunction(fetchContract), [])

  return [contract, groupIds, reloadContract, isLoading]
}
