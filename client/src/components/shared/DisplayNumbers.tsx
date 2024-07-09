import { useGetTransactions } from "../../lib/react-query/queriesAndMutations";
import Loader from "../../components/shared/Loader";
import { TDisplayNumber } from "../../types/types";

const DisplayNumbers: React.FC<TDisplayNumber> = ({
  transactionBalance,
  income,
  expense,
  balance,
  walletLoading,
}) => {
  const { isLoading: transactionsLoading } = useGetTransactions();

  return (
    <div className="flex flex-col md:flex-row gap-5 lg:gap-1 xl:gap-4 justify-start ">
      <div className="w-full md:w-[33%] py-5 px-8 bg-[#1A222B] flex flex-col gap-3 rounded-lg">
        <span className="font-bold text-[#00FF40]"> Income </span>
        {walletLoading || transactionsLoading ? (
          <Loader />
        ) : (
          <h1 className="text-[1.5rem] font-bold w-full truncate ">
            ₱{" "}
            {income.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        )}
      </div>

      <div className="w-full md:w-[33%] py-5 px-8 bg-[#1A222B] flex flex-col gap-3 rounded-lg">
        <span className="font-bold text-[#FF0800]"> Expense </span>
        {walletLoading || transactionsLoading ? (
          <Loader />
        ) : (
          <h1 className="text-[1.5rem] font-bold w-full truncate ">
            ₱{" "}
            {expense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        )}
      </div>

      <div className="w-full md:w-[33%] py-5 px-8 bg-[#1A222B] flex flex-col gap-3 rounded-lg">
        <span className="font-bold text-[#0070FF]"> Balance </span>
        {walletLoading || transactionsLoading ? (
          <Loader />
        ) : (
          <h1 className="text-[1.5rem] font-bold w-full truncate ">
            ₱{" "}
            {transactionBalance === 0 || !transactionBalance
              ? balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : transactionBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </h1>
        )}
      </div>
    </div>
  );
};

export default DisplayNumbers;
