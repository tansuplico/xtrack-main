import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  isBefore,
  addMonths,
  subMonths,
  startOfYear,
  endOfYear,
} from "date-fns";
import { toast } from "react-toastify";
import { useWallet } from "../../lib/context/useWalletProvider";
import { TChartComponentProps } from "../../types/types";

const ChartComponent: React.FC<TChartComponentProps> = ({
  balance,
  income,
  transactionArr,
  view,
  handleBalanceChange,
}) => {
  const [dateMap, setDateMap] = useState<
    Map<
      string,
      Map<string, { income: number; balance: number; expense: number }>
    >
  >(new Map());

  const [monthMap, setMonthMap] = useState<
    Map<string, { income: number; balance: number; expense: number }>
  >(new Map());

  const { incomeChanges } = useWallet();
  const [currentDate] = useState(new Date());
  const [currentMonth] = useState(currentDate);
  const [initialBalance] = useState<number>(balance);
  const [initialIncome] = useState<number>(income);
  useEffect(() => {
    const updateDateMap = () => {
      const newDateMap = new Map<
        string,
        Map<string, { income: number; balance: number; expense: number }>
      >();

      const startDate = startOfMonth(currentDate);
      const endDate = endOfMonth(currentDate);
      const currentMonthKey = format(startDate, "MMM yyyy");

      const currentMonthMap = new Map<
        string,
        { income: number; balance: number; expense: number }
      >();
      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
        const formattedDate = format(date, "MMM dd");
        currentMonthMap.set(formattedDate, {
          income: 0,
          balance: 0,
          expense: 0,
        });
      }
      newDateMap.set(currentMonthKey, currentMonthMap);

      const sortedTransactions = [...transactionArr].sort((a, b) => {
        if (!a.date) return -1;
        if (!b.date) return 1;
        return isBefore(new Date(a.date), new Date(b.date)) ? -1 : 1;
      });

      let runningBalance = initialBalance;
      let currentIncome = incomeChanges[0]?.value || 0;
      let monthlyTotalExpenses = 0;
      let changeIndex = 0;

      const lastTransactionForMonth = new Map<
        string,
        { date: string; income: number; balance: number; expense: number }
      >();

      sortedTransactions.forEach((transaction) => {
        if (transaction.date) {
          const transactionDate = new Date(transaction.date);
          const transactionMonthKey = format(transactionDate, "MMM yyyy");
          const formattedDate = format(transactionDate, "MMM dd");

          if (!newDateMap.has(transactionMonthKey)) {
            newDateMap.set(transactionMonthKey, new Map());
          }

          const monthMap = newDateMap.get(transactionMonthKey)!;

          while (
            changeIndex < incomeChanges.length &&
            new Date(incomeChanges[changeIndex].date) <= transactionDate
          ) {
            currentIncome = incomeChanges[changeIndex].value;
            changeIndex++;
          }

          let dateData = monthMap.get(formattedDate);
          if (!dateData) {
            dateData = { income: 0, balance: 0, expense: 0 };
            monthMap.set(formattedDate, dateData);
          }

          dateData.income = currentIncome;
          if (transaction.categoryData.type === "Income") {
            dateData.income = currentIncome;
            runningBalance += transaction.amount;
            handleBalanceChange(runningBalance);
          } else if (transaction.categoryData.type === "Expenses") {
            dateData.expense += transaction.amount;
            runningBalance -= transaction.amount;
            handleBalanceChange(runningBalance);
            monthlyTotalExpenses += transaction.amount;
          }

          dateData.balance = runningBalance;
          monthMap.set(formattedDate, dateData);

          if (
            !lastTransactionForMonth.has(transactionMonthKey) ||
            transactionDate >
              new Date(lastTransactionForMonth.get(transactionMonthKey)!.date)
          ) {
            lastTransactionForMonth.set(transactionMonthKey, {
              date: format(transactionDate, "yyyy-MM-dd"),
              balance: runningBalance,
              income: currentIncome,
              expense: monthlyTotalExpenses,
            });
          }
        } else {
          toast.error("Transaction date is missing or invalid");
        }
      });

      setDateMap(newDateMap);

      const newMonthMap = new Map<
        string,
        { income: number; balance: number; expense: number }
      >();
      const visibleStartMonth = startOfYear(currentMonth);
      const visibleEndMonth = endOfYear(currentMonth);

      for (
        let month = visibleStartMonth;
        month <= visibleEndMonth;
        month = addMonths(month, 1)
      ) {
        const formattedMonth = format(month, "MMM yyyy");
        newMonthMap.set(formattedMonth, { income: 0, balance: 0, expense: 0 });
      }

      lastTransactionForMonth.forEach((value, key) => {
        if (newMonthMap.has(key)) {
          newMonthMap.set(key, {
            income: value.income,
            balance: value.balance,
            expense: value.expense,
          });
        }
      });

      setMonthMap(newMonthMap);
    };

    updateDateMap();
  }, [transactionArr, initialBalance, initialIncome, currentDate]);

  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const chartData = [];
  const visibleStartDate = subDays(currentDate, 3);
  const visibleEndDate = addDays(currentDate, 3);
  const currentMonthKey = format(currentDate, "MMM yyyy");
  const currentMonthMap = dateMap.get(currentMonthKey) || new Map();

  for (
    let date = visibleStartDate;
    date <= visibleEndDate;
    date = addDays(date, 1)
  ) {
    const formattedDate = format(date, "MMM dd");
    const data = currentMonthMap.get(formattedDate);
    if (data) {
      chartData.push({
        date: formattedDate,
        income: data.income,
        balance: data.balance,
        expense: data.expense,
      });
    } else {
      chartData.push({
        date: formattedDate,
        income: 0,
        balance: 0,
        expense: 0,
      });
    }
  }

  const months = [];
  const visibleStartMonth = subMonths(currentMonth, 3);
  const visibleEndMonth = addMonths(currentMonth, 3);

  for (
    let month = visibleStartMonth;
    month <= visibleEndMonth;
    month = addMonths(month, 1)
  ) {
    const formattedMonth = format(month, "MMM yyyy");
    const data = monthMap.get(formattedMonth);
    if (data) {
      months.push({
        date: formattedMonth,
        income: data.income,
        balance: data.balance,
        expense: data.expense,
      });
    } else {
      months.push({
        date: formattedMonth,
        income: 0,
        balance: 0,
        expense: 0,
      });
    }
  }

  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart data={view === "days" ? chartData : months}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Bar dataKey="income" fill="#00FF40" />
        <Bar dataKey="balance" fill="#0070FF" />
        <Bar dataKey="expense" fill="#FF0800" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        {payload[0] && payload[0].value !== undefined && (
          <p className="text-sm text-blue-400">
            Income:
            <span className="ml-2">${payload[0].value}</span>
          </p>
        )}
        {payload[1] &&
          payload[1].dataKey === "balance" &&
          payload[1].value !== undefined && (
            <p className="text-sm text-blue-400">
              Balance:
              <span className="ml-2">${payload[1].value}</span>
            </p>
          )}
        {payload[2] && payload[2].value !== undefined && (
          <p className="text-sm text-indigo-400">
            Expenses:
            <span className="ml-2">${payload[2].value}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};
