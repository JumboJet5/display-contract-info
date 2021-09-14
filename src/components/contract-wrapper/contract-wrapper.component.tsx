import React, { FunctionComponent } from "react";
import useContract from "../../hooks/contract.hook";

export const ContractContext = React.createContext(null);

const ContractWrapperComponent: FunctionComponent = ({ children }) => {
  const [contract] = useContract();

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
}

export default ContractWrapperComponent;
