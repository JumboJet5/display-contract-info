import { useCallback, useContext, useEffect, useState } from "react";
import { getGroupIds } from "../core/consts/web3";
import { cloneFunction } from "../core/consts/clone-function.constant";
import { ContractContext } from "../components/contract-wrapper/contract-wrapper.component";


export default function useGroupIds(): [string[], (() => Promise<void>), boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const contract = useContext(ContractContext)

  const fetchGroupIds = async () => {
    setGroupIds(await getGroupIds(contract));
    setIsLoading(false);
  }

  useEffect(() => void fetchGroupIds(), [contract]);
  const reloadGroupIds = useCallback(cloneFunction(fetchGroupIds), [contract])

  return [groupIds, reloadGroupIds, isLoading]
}
