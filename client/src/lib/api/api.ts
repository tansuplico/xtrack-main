import { TCategory, TExisting, TUserData } from "../../types/types";
import axios from "axios";

// User
export const userSignUp = async (userData: TUserData) => {
  if (!userData) {
    throw new Error("No input found");
  }

  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/user/signup",
      userData,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const userLogin = async (
  userData: Pick<TUserData, "email" & "password">
) => {
  if (!userData) {
    throw new Error("No input found");
  }

  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/user/login",
      userData,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const userLogout = async () => {
  try {
    const response = await axios.delete(
      "https://xtrack-main.onrender.com/user/logout",
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(
      "https://xtrack-main.onrender.com/user/user",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};
// Auth
export const checkAuth = async () => {
  try {
    const response = await axios.get(
      "https://xtrack-main.onrender.com/api/session",
      {
        withCredentials: true,
      }
    );
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};

// Categories
export const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://xtrack-main.onrender.com/categories/categories",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const modifyCategories = async (
  type: string,
  category: string,
  existing: TExisting,
  newName: string,
  newColor: string,
  newIcon: string
) => {
  try {
    const response = await axios.put(
      "https://xtrack-main.onrender.com/categories/modify-categories",
      { type, category, existing, newName, newColor, newIcon },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const addCategories = async (
  colorPicked: string,
  iconPicked: string,
  categoryName: string,
  typePicked: string
) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/categories/create-category",
      {
        colorPicked,
        iconPicked,
        categoryName,
        typePicked,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const deleteCategories = async (categoryName: string, type: string) => {
  try {
    const response = await axios.delete(
      "https://xtrack-main.onrender.com/categories/delete-categories",
      { data: { categoryName, type }, withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

// Transaction
export const getTransactions = async () => {
  try {
    const response = await axios.get(
      "https://xtrack-main.onrender.com/transactions/transactions",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const addTransactions = async (
  categoryData: TCategory,
  amount: number,
  date: Date | null,
  currency: string
) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/transactions/add-transactions",
      { data: { categoryData, amount, date, currency } },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const clearHistory = async () => {
  try {
    const response = await axios.put(
      "https://xtrack-main.onrender.com/transactions/clear-history",
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const removeTransaction = async (
  id: string,
  type: string,
  category: string
) => {
  try {
    const response = await axios.delete(
      "https://xtrack-main.onrender.com/transactions/remove-transaction",
      { data: { id, type, category }, withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

// Wallet
export const getWallet = async () => {
  try {
    const response = await axios.get(
      "https://xtrack-main.onrender.com/wallet/wallet",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const modifyBalance = async (balance: number) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/wallet/update-balance",
      { balance },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const modifyIncome = async (income: number, changeData: Object) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/wallet/update-income",
      { income, changeData },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const modifyProfile = async (username: string, image: string) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/wallet/update-profile",
      { username, image },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const modifyPassword = async (password: string, repassword: string) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/wallet/update-password",
      { password, repassword },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};

export const resetPassword = async (
  password: string,
  repassword: string,
  email: string
) => {
  try {
    const response = await axios.post(
      "https://xtrack-main.onrender.com/wallet/change-password",
      { password, repassword, email },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.error || "There was a problem with the server."
    );
  }
};
