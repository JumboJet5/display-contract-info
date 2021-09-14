import { useCallback, useEffect, useState } from "react";
import { Contract } from "web3-eth-contract";
import { getContract } from "../core/consts/web3";
import { cloneFunction } from "../core/consts/clone-function.constant";

export default function useContract(): [Contract, (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contract, setContract] = useState<Contract>(undefined);

  const fetchContract = async () => {
    setContract(await getContract());
    setIsLoading(false);
  }

  useEffect(() => void fetchContract(), []);
  const reloadContract = useCallback(cloneFunction(fetchContract), [])

  return [contract, reloadContract, isLoading];
}
