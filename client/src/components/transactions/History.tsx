import React from "react";
import {
  useClearHistory,
  useRemoveTransaction,
} from "../../lib/react-query/queriesAndMutations";
import { format } from "date-fns";
import remove from "../../assets/remove.png";
import wallet from "../../assets/wallet.svg";
import clear from "../../assets/clear.svg";
import { THistory } from "../../types/types";

const History: React.FC<THistory> = ({ toast, transactionArr }) => {
  const { mutateAsync: removeTransaction } = useRemoveTransaction();
  const { mutateAsync: clearHistory } = useClearHistory();

  const removeSingleTransaction = async (
    id: string,
    type: string,
    category: string
  ) => {
    await removeTransaction({ id: id, type: type, category: category });

    toast.success("Transaction removed");
  };

  const clearTransactionHistory = async () => {
    await clearHistory();
    toast.success("Transaction history cleared");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-[1.4rem]">Transaction History</h1>
        {transactionArr.length > 0 && (
          <img
            src={clear}
            alt="clear"
            className="w-7 h-7 cursor-pointer"
            onClick={() => clearTransactionHistory()}
          />
        )}
      </div>
      <div className="w-full h-[24.5rem] overflow-y-scroll flex flex-col gap-5">
        {transactionArr.length > 0 ? (
          transactionArr.map((tr, i) => {
            return (
              <div
                className="flex justify-between items-center gap-2 md:gap-10"
                key={i}
              >
                <div className="sm:w-[45%] md:w-[60%] xl:w-[45%] flex gap-2 md:gap-5 items-center">
                  <div
                    className={`w-[40px] h-[40px] md:w-[46px] md:h-[46px] flex justify-center items-center bg-[#${tr.categoryData.color}] rounded-full`}
                  >
                    <img
                      src={tr.categoryData.icon}
                      alt={tr.categoryData.category}
                      className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <h1 className="text-[.8rem] font-bold">
                      {tr.categoryData.category}
                    </h1>

                    <span className="sm:hidden md:block xl:hidden text-[.7rem]">
                      {tr.date
                        ? format(tr.date, "MM/dd/yyyy")
                        : "No date available"}
                    </span>

                    <h3
                      className={`sm:hidden md:block xl:hidden text-[.8rem] font-bold text-[#${
                        tr.categoryData.type === "Income" ? "0070FF" : "FF0800"
                      }]`}
                    >
                      {tr.categoryData.type === "Income" ? "+₱" : "-₱"}

                      {tr.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h3>
                  </div>
                </div>

                <div className="sm:w-[55%] md:w-auto xl:w-[55%] flex justify-between items-center">
                  <span className="hidden sm:block md:hidden xl:block text-[.7rem]">
                    {tr.date
                      ? format(tr.date, "MM/dd/yyyy")
                      : "No date available"}
                  </span>

                  <div className="flex gap-3">
                    <h3
                      className={`hidden sm:block md:hidden xl:block truncate font-bold text-[#${
                        tr.categoryData.type === "Income" ? "0070FF" : "FF0800"
                      }]`}
                    >
                      {tr.categoryData.type === "Income" ? "+₱" : "-₱"}

                      {tr.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h3>

                    <img
                      src={remove}
                      alt="remove"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() =>
                        removeSingleTransaction(
                          tr._id,
                          tr.categoryData.type,
                          tr.categoryData.category
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" mt-10 flex flex-col justify-center items-center">
            <img src={wallet} alt="wallet" className="w-[40%]" />

            <h1> No transactions found </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default History;
