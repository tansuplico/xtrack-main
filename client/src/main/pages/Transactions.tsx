import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { TCategory, TTransaction } from "../../types/types";
import {
  useAddTransactions,
  useGetTransactions,
  useGetWallet,
} from "../../lib/react-query/queriesAndMutations";
import TransactionForm from "../../components/transactions/TransactionForm";
import DisplayNumbers from "../../components/shared/DisplayNumbers";
import History from "../../components/transactions/History";
import NavMenu from "../../components/shared/NavMenu";
import { useOutletContext } from "react-router-dom";

const Transactions = () => {
  const { setShowSidebar, setTransactionBalance, transactionBalance } =
    useOutletContext<{
      setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
      setTransactionBalance: React.Dispatch<React.SetStateAction<number>>;
      transactionBalance: number;
    }>();
  const { mutateAsync: addTransactions } = useAddTransactions();

  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("PHP");
  const [date, setDate] = useState<Date | null>(new Date());
  const [categoryChoice, setCategoryChoice] = useState({
    icon: "",
    color: "",
    category: "",
    transactionCount: 0,
    type: "",
  });
  const { data: transactionsData } = useGetTransactions();
  const [transactionArr, setTransactionArr] = useState<TTransaction[]>([]);
  const { data: walletData, isLoading: walletLoading } = useGetWallet();
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    if (walletData) {
      setBalance(walletData[0].balance);
    }
  }, [walletData]);

  useEffect(() => {
    if (transactionsData) {
      setTransactionArr(transactionsData[0].history);
    }
  }, [transactionsData]);

  useEffect(() => {
    if (walletData) {
      setExpense(walletData[0].expense);
      setBalance(walletData[0].balance);
      setIncome(walletData[0].income);
    }
  }, [walletData]);

  useEffect(() => {
    if (transactionArr.length > 0) {
      const updatedBalance = transactionArr.reduce((acc, transaction) => {
        if (transaction.categoryData.type === "Income") {
          return acc + transaction.amount;
        } else if (transaction.categoryData.type === "Expenses") {
          return acc - transaction.amount;
        }
        return acc;
      }, balance);
      setTransactionBalance(updatedBalance);
    } else if (walletData) {
      setTransactionBalance(walletData[0].balance);
    }
  }, [transactionArr, balance, walletData]);

  const addTransaction = async (
    categoryChoice: TCategory,
    amount: number,
    date: Date | null,
    currency: string
  ) => {
    await addTransactions({
      categoryData: categoryChoice,
      amount: amount,
      date: date,
      currency: currency,
    });

    setCategoryChoice({
      icon: "",
      color: "",
      category: "",
      transactionCount: 0,
      type: "",
    });
    setAmount(0);
    setDate(new Date());
    setCurrency("PHP");
    toast.success("Transaction recorded");
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full px-[2rem] lg:px-[1rem] xl:px-[5rem] py-4">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[1.7rem] font-bold"> Transactions </h1>
          <NavMenu setShowSidebar={toggleSidebar} />
        </div>
        <DisplayNumbers
          transactionBalance={transactionBalance}
          income={income}
          expense={expense}
          balance={balance}
          walletLoading={walletLoading}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-2">
        <div className="w-full md:w-[50%] flex flex-col ">
          <h1 className="font-bold text-[1.4rem] mb-2"> Create Transaction </h1>
          <hr className="mb-5" />

          <TransactionForm
            categoryChoice={categoryChoice}
            setCategoryChoice={setCategoryChoice}
            setAmount={setAmount}
            setDate={setDate}
            amount={amount}
            date={date}
          />

          <button
            className="bg-[#228B22] py-4 mt-10 rounded-lg"
            onClick={() =>
              addTransaction(categoryChoice, amount, date, currency)
            }
          >
            Add Transaction
          </button>
        </div>

        <div className=" w-full md:w-[50%] md:px-2 flex flex-col">
          <History toast={toast} transactionArr={transactionArr} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
