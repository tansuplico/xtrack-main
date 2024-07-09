import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategories,
  addTransactions,
  checkAuth,
  clearHistory,
  deleteCategories,
  getCategories,
  getTransactions,
  getUser,
  getWallet,
  modifyBalance,
  modifyCategories,
  modifyIncome,
  modifyPassword,
  modifyProfile,
  removeTransaction,
  resetPassword,
  userLogin,
  userLogout,
  userSignUp,
} from "../api/api";
import {
  TAddCategories,
  TAddTransactions,
  TChangePassword,
  TDeleteCategories,
  TModifyBalance,
  TModifyCategoriesArgs,
  TModifyIncome,
  TModifyPassword,
  TModifyProfile,
  TRemoveTransaction,
  TUserData,
} from "../../types/types";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const useCheckAuthUser = () => {
  return useMutation({
    mutationFn: () => checkAuth(),
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

// Hook to use categories query
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useModifyCategories = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TModifyCategoriesArgs>({
    mutationFn: ({ type, category, existing, newName, newColor, newIcon }) =>
      modifyCategories(type, category, existing, newName, newColor, newIcon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useAddCategories = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TAddCategories>({
    mutationFn: ({ colorPicked, iconPicked, categoryName, typePicked }) =>
      addCategories(colorPicked, iconPicked, categoryName, typePicked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TDeleteCategories>({
    mutationFn: ({ categoryName, type }) =>
      deleteCategories(categoryName, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

// Transaction
export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};

export const useAddTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TAddTransactions>({
    mutationFn: ({ categoryData, amount, date, currency }) =>
      addTransactions(categoryData, amount, date, currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useRemoveTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TRemoveTransaction>({
    mutationFn: ({ id, type, category }) =>
      removeTransaction(id, type, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

// Wallet
export const useGetWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};

export const useModifyBalance = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TModifyBalance>({
    mutationFn: ({ balance }) => modifyBalance(balance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useModifyIncome = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TModifyIncome>({
    mutationFn: ({ income, changeData }) => modifyIncome(income, changeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useModifyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TModifyProfile>({
    mutationFn: ({ username, image }) => modifyProfile(username, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useModifyPassword = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any, any>, Error, TModifyPassword>({
    mutationFn: ({ password, repassword }) =>
      modifyPassword(password, repassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<AxiosResponse<any, any>, Error, TChangePassword>({
    mutationFn: ({ password, repassword, email }) =>
      resetPassword(password, repassword, email),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log(err);

      toast.error(`${err}`);
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData: TUserData) => userSignUp(userData),
    onSuccess: () => {
      toast.success("Login success");
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Pick<TUserData, "email" & "password">) =>
      userLogin(userData),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Login success");
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logout success");
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });
};
