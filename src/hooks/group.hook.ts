import { Contract } from "web3-eth-contract";
import { useCallback, useEffect, useState } from "react";
import { getGroup } from "../core/consts/web3";
import { cloneFunction } from "../core/consts/clone-function.constant";
import { IGroup } from "../core/interfaces/group.interface";

export default function useGroup(contract: Contract, groupId: string): [IGroup, (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [group, setGroup] = useState<IGroup>(undefined);

  const fetchGroup = async () => {
    setGroup(await getGroup(contract, groupId))
    setIsLoading(false);
  }

  useEffect(() => void fetchGroup(), [contract, groupId]);
  const reloadGroup = useCallback(cloneFunction(fetchGroup), [])

  return [group, reloadGroup, isLoading]
}
