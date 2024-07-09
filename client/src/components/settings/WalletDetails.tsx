import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetWallet,
  useModifyBalance,
  useModifyIncome,
} from "../../lib/react-query/queriesAndMutations";

const WalletDetails = () => {
  const { mutateAsync: modifyBalance } = useModifyBalance();
  const { mutateAsync: modifyIncome } = useModifyIncome();
  const [initBalance, setInitBalance] = useState<number>(0);
  const [initIncome, setInitIncome] = useState<number>(0);

  const { data: walletData } = useGetWallet();

  useEffect(() => {
    if (walletData) {
      setInitIncome(walletData[0].income);
      setInitBalance(walletData[0].initialBalance);
    }
  }, [walletData]);

  const updateBalanceWallet = async (initBalance: number) => {
    await modifyBalance({ balance: initBalance });
    setInitBalance(initBalance);
    toast.success("Balance updated");
  };

  const updateIncomeWallet = async (initIncome: number) => {
    const currentDate = new Date().toISOString();
    const changeData = { date: currentDate, value: initIncome };

    await modifyIncome({ income: initIncome, changeData: changeData });

    toast.success("Income updated");
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-[.8rem]"> Initial Balance </span>
        <div className="bg-[#1A222B] rounded-md">
          <input
            type="number"
            className="w-full py-4 pl-5 bg-transparent focus:outline-none no-spinner"
            placeholder="0.00"
            onChange={(e) => {
              const val = parseFloat(e.currentTarget.value);
              setInitBalance(val ? val : 0);
            }}
            value={initBalance}
          />
        </div>
      </div>

      <div>
        <span className="text-[.8rem]"> Initial Income </span>
        <div className="bg-[#1A222B] rounded-md">
          <input
            type="number"
            className="w-full py-4 pl-5 bg-transparent focus:outline-none no-spinner"
            placeholder="0.00"
            onChange={(e) => {
              const val = parseFloat(e.currentTarget.value);
              setInitIncome(val ? val : 0);
            }}
            value={initIncome}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col xmlg:flex-row gap-5">
        <button
          className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
          onClick={() => updateBalanceWallet(initBalance)}
        >
          Update Balance
        </button>

        <button
          className="w-full bg-[#228B22] py-4 px-10 rounded-md cursor-pointer"
          onClick={() => updateIncomeWallet(initIncome)}
        >
          Update Income
        </button>
      </div>
    </div>
  );
};

export default WalletDetails;
