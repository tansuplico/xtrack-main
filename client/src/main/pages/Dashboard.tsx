import { useEffect, useState } from "react";
import ChartComponent from "../../components/dashboard/ChartComponent";
import {
  useGetTransactions,
  useGetWallet,
} from "../../lib/react-query/queriesAndMutations";
import wallet from "../../assets/wallet.svg";

import { format } from "date-fns";
import Loader from "../../components/shared/Loader";
import { Link, useOutletContext } from "react-router-dom";
import NavMenu from "../../components/shared/NavMenu";
import { TTransaction } from "../../types/types";

const Dashboard = () => {
  const { setShowSidebar, setTransactionBalance } = useOutletContext<{
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setTransactionBalance: React.Dispatch<React.SetStateAction<number>>;
  }>();

  const { data: walletData, isLoading: walletLoading } = useGetWallet();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactions();
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(() => {
    return walletData ? walletData[0].balance : 0;
  });

  const [transactionArr, setTransactionArr] = useState<TTransaction[]>([]);
  const [view, setView] = useState("days");

  useEffect(() => {
    if (walletData) {
      setIncome(walletData[0].currentIncome);
      setExpense(walletData[0].expense);
      setBalance(walletData[0].balance);
    }
  }, [walletData]);

  useEffect(() => {
    if (transactionsData) {
      setTransactionArr(transactionsData[0].history);
    }
  }, [transactionsData]);

  const handleBalanceChange = (newBalance: number) => {
    setBalance(newBalance);
    setTransactionBalance(newBalance);
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="w-full xl:h-full px-[2rem] lg:px-[3rem] xl:px-[5rem] py-4 ">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[1.7rem] font-bold "> Dashboard </h1>
          <NavMenu setShowSidebar={toggleSidebar} />
        </div>
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
                {balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 overflow-y-scroll">
        <div className="w-full lg:w-[33%] flex flex-col bg-[#1A222B] rounded-lg p-5 order-2 lg:order-1">
          <div className="flex  lg:flex-row justify-between items-center lg:items-start xl:items-center mb-5 ">
            <h1 className="font-bold"> Transactions </h1>

            <Link to="/transactions">
              <h1 className="text-[.9rem] font-bold cursor-pointer hover:text-[#228B22] transition-all">
                Show all
              </h1>
            </Link>
          </div>

          <div className="h-[24.5rem] lg:h-[21.5rem] xl:h-[21rem] overflow-y-scroll flex flex-col gap-5">
            {transactionArr.length > 0 ? (
              transactionArr.map((tr, i) => {
                return (
                  <div
                    className="flex lg:flex-col xmlg:flex-row justify-between items-center lg:items-start xmlg:items-center gap-3 items"
                    key={i}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-[30px] h-[30px] xsm:w-[36px] xsm:h-[36px] flex justify-center items-center bg-[#${tr.categoryData.color}] rounded-full`}
                      >
                        <img
                          src={tr.categoryData.icon}
                          alt={tr.categoryData.category}
                          className="w-[20px] h-[20px]"
                        />
                      </div>

                      <div className="flex flex-col gap-0">
                        <h1 className="text-[.6rem] xsm:text-[.7rem] font-bold">
                          {tr.categoryData.category}
                        </h1>
                        <span className="text-[.5rem]">
                          {tr.date
                            ? format(tr.date, "MM/dd/yyyy")
                            : "No date available"}
                        </span>

                        <h3
                          className={`font-bold text-[#${
                            tr.categoryData.type === "Income"
                              ? "0070FF"
                              : "FF0800"
                          }] w-[40%] lg:w-full xl:truncate hidden lg:block xmlg:hidden  text-[.7rem] xsm:text-[.8rem]`}
                        >
                          {tr.categoryData.type === "Income" ? "+₱" : "-₱"}

                          {tr.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </h3>
                      </div>
                    </div>

                    <div className="w-1/2 flex justify-end">
                      <h3
                        className={`font-bold text-[#${
                          tr.categoryData.type === "Income"
                            ? "0070FF"
                            : "FF0800"
                        }] truncate lg:hidden xmlg:block flex justify-center items-center text-[.7rem] xsm:text-[.8rem] `}
                      >
                        {tr.categoryData.type === "Income" ? "+₱" : "-₱"}

                        {tr.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h3>
                    </div>
                  </div>
                );
              })
            ) : transactionsLoading ? (
              <Loader />
            ) : (
              <div className=" mt-10 flex flex-col justify-center items-center">
                <img src={wallet} alt="wallet" className="w-[40%]" />

                <h1> No transactions found </h1>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-full lg:w-[67%] pb-5 flex flex-col bg-[#1A222B] order-1 lg:order-2">
          {walletLoading || transactionsLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="w-full flex justify-end ">
                <div className="flex border border-gray-600 ">
                  <h1
                    className="hover:bg-[#228B22] px-2 transition-all cursor-pointer"
                    onClick={() => setView("days")}
                  >
                    Days
                  </h1>
                  <h1
                    className="hover:bg-[#228B22] px-2 transition-all cursor-pointer border-x border-gray-600"
                    onClick={() => setView("months")}
                  >
                    Months
                  </h1>
                </div>
              </div>
              <ChartComponent
                balance={balance}
                income={income}
                transactionArr={transactionArr}
                view={view}
                handleBalanceChange={handleBalanceChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
