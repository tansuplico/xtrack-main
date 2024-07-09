import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useGetWallet } from "../react-query/queriesAndMutations";

interface WalletContextType {
  income: number;
  setIncome: (income: number) => void;
  incomeChanges: Array<{ date: string; value: number }>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: walletData } = useGetWallet();

  const [income, setIncome] = useState<number>(100);
  const [incomeChanges, setIncomeChanges] = useState<
    Array<{ date: string; value: number }>
  >([]);

  useEffect(() => {
    if (walletData) {
      setIncome(walletData[0].currentIncome);
      setIncomeChanges(walletData[0].incomeChanges);
    }
  }, [walletData]);

  return (
    <WalletContext.Provider value={{ income, setIncome, incomeChanges }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
