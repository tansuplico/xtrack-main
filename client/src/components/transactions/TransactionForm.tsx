import React, { useEffect, useState } from "react";
import { useGetCategories } from "../../lib/react-query/queriesAndMutations";
import { expenseData, incomeData } from "../../api/apiTest";
import down_arrow from "../../assets/down-arrow.svg";
import DatePicker from "react-datepicker";
import { TCategory, TTransactionForm } from "../../types/types";
import { CSSTransition } from "react-transition-group";

const TransactionForm: React.FC<TTransactionForm> = ({
  categoryChoice,
  setCategoryChoice,
  setAmount,
  setDate,
  amount,
  date,
}) => {
  const { data: categoriesData } = useGetCategories();
  const [showIcon, setShowIcon] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState(true);
  const [incomeSelected, setIncomeSelected] = useState(false);
  const [expenseArr, setExpensesArr] = useState<TCategory[]>(expenseData);
  const [incomeArr, setIncomesArr] = useState<TCategory[]>(incomeData);

  useEffect(() => {
    if (categoriesData) {
      setExpensesArr(categoriesData[0].expenses);
      setIncomesArr(categoriesData[0].income);
    }
  }, [categoriesData]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col xmd:flex-row md:flex-col xlg:flex-row lg:flex-col xmlg:flex-row  gap-5 xlg:gap-2 relative">
        <div className="w-full xmd:w-[46%] md:w-full xlg:w-[46%] lg:w-full xmlg:w-[46%]">
          <span className="text-[.8rem]"> Category </span>
          <div className="px-3 bg-[#1A222B] rounded-md ">
            <div className="flex justify-between items-center py-2">
              <div
                className={`w-full ${
                  categoryChoice.icon ? "py-[.1rem]" : "py-[.6rem]"
                } pl-2 flex gap-5 justify-between items-center `}
              >
                {categoryChoice.icon ? (
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-[40px] h-[40px] bg-[#${categoryChoice.color}] flex justify-center items-center rounded-full`}
                    >
                      <img
                        src={`http://localhost:5000${categoryChoice.icon}`}
                        alt={`${categoryChoice.icon}`}
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                    <h1 className="text-[.8rem]">{categoryChoice.category}</h1>
                  </div>
                ) : (
                  <h1 className="text-[.9rem] text-gray-400">
                    Select Category
                  </h1>
                )}

                <img
                  src={down_arrow}
                  className={`w-5 h-5 ${
                    showIcon && "rotate-180 "
                  } transition-all cursor-pointer `}
                  onClick={() => setShowIcon((val) => !val)}
                />
              </div>
            </div>
          </div>
        </div>

        <CSSTransition
          in={showIcon}
          timeout={300}
          classNames="icon-customize"
          unmountOnExit
        >
          <div className="h-[21.5rem] absolute top-[5.7rem] bg-[#1A222B] flex flex-col gap-3 rounded-lg z-10">
            <div className="flex gap-3 px-5 pt-3 ">
              <div
                className="w-[6.5rem] text-[.8rem] bg-[#228B22] py-2 flex justify-center items-center rounded-md cursor-pointer"
                onClick={() => {
                  setExpenseSelected(true);
                  setIncomeSelected(false);
                }}
              >
                <h1> Expenses </h1>
              </div>
              <div
                className="w-[6.5rem] text-[.8rem] bg-[#228B22] py-2 flex justify-center items-center rounded-md cursor-pointer"
                onClick={() => {
                  setIncomeSelected(true);
                  setExpenseSelected(false);
                }}
              >
                <h1> Income </h1>
              </div>
            </div>
            <div className="flex flex-col overflow-y-scroll">
              {expenseSelected &&
                expenseArr.map((ex, i) => {
                  return (
                    <div
                      className="flex justify-between items-center px-5 py-2 hover:bg-[#228B22] cursor-pointer transition-all"
                      onClick={() => {
                        setCategoryChoice({
                          icon: ex.icon,
                          color: ex.color,
                          category: ex.category,
                          transactionCount: ex.transactionCount,
                          type: ex.type,
                        });
                        setShowIcon(false);
                      }}
                      key={i}
                    >
                      <div className="w-full flex gap-5 items-center ">
                        <div
                          className={`w-[40px] h-[40px] flex justify-center items-center bg-[#${ex.color}] rounded-full`}
                        >
                          <img
                            src={`http://localhost:5000${ex.icon}`}
                            alt={ex.category}
                            className="w-[24px] h-[24px]"
                          />
                        </div>
                        <h1 className="text-[.9rem] font-bold">
                          {ex.category}
                        </h1>
                      </div>
                    </div>
                  );
                })}

              {incomeSelected &&
                incomeArr.map((inc, i) => {
                  return (
                    <div
                      className="flex justify-between items-center px-5 py-2 hover:bg-[#228B22] cursor-pointer transition-all"
                      onClick={() => {
                        setCategoryChoice({
                          icon: inc.icon,
                          color: inc.color,
                          category: inc.category,
                          transactionCount: inc.transactionCount,
                          type: inc.type,
                        });
                        setShowIcon(false);
                      }}
                      key={i}
                    >
                      <div className="w-full flex gap-5 items-center ">
                        <div
                          className={`w-[40px] h-[40px] flex justify-center items-center bg-[#${inc.color}] rounded-full`}
                        >
                          <img
                            src={`http://localhost:5000${inc.icon}`}
                            alt={inc.category}
                            className="w-[24px] h-[24px]"
                          />
                        </div>
                        <h1 className="text-[.9rem] font-bold">
                          {inc.category}
                        </h1>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </CSSTransition>

        <div className="xmd:w-[54%] md:w-full xlg:w-[54%] lg:w-full xmlg:w-[54%]">
          <span className="text-[.8rem]"> Amount </span>
          <div className="bg-[#1A222B] rounded-md">
            <input
              type="number"
              className="py-4 pl-5 pr-5 bg-transparent focus:outline-none no-spinner"
              placeholder="0.00"
              onChange={(e) => {
                const val = parseFloat(e.currentTarget.value);
                setAmount(val);
              }}
              value={amount === 0 ? "" : amount}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col xmd:flex-row lg:flex-col xmlg:flex-row gap-5 lg:gap-2 relative">
        <div>
          <span className="text-[.8rem]"> Date </span>
          <div className="bg-[#1A222B] rounded-md py-4 pl-5 ">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="bg-transparent focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full">
          <span className="text-[.8rem]"> Currency </span>
          <div className="bg-[#1A222B] rounded-md ">
            <h1 className="w-full py-4 pl-5 text-gray-400">PHP</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
