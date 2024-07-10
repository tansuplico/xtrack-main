import { MutableRefObject } from "react";

export type TUserData = {
  username: string;
  email: string;
  password: string;
};

export type TAuth = {
  user: Pick<TUserData, "email" & "password">;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkAuthUser: () => Promise<boolean>;
};

export type TCategory = {
  icon: string;
  color: string;
  category: string;
  transactionCount: number;
  type: string;
};

export type TExisting = {
  category: string;
  color: string;
  icon: string;
  transactionCount: number;
  type: string;
};

// Define the main categories type
export type TCategories = {
  id: string;
  expenses: TCategory[];
  income: TCategory[];
};

export type TModifyCategoriesArgs = {
  type: string;
  category: string;
  existing: TExisting;
  newName: string;
  newColor: string;
  newIcon: string;
};

export type TAddCategories = {
  colorPicked: string;
  iconPicked: string;
  categoryName: string;
  typePicked: string;
};

export type TDeleteCategories = {
  categoryName: string;
  type: string;
};

export type TAddTransactions = {
  categoryData: TCategory;
  amount: number;
  date: Date | null;
  currency: string;
};

export type TModifyWallet = {
  balance: number;
  income: number;
};

export type TModifyBalance = {
  balance: number;
};

export type TModifyIncome = {
  income: number;
  changeData: {
    date: string;
    value: number;
  };
};

export type TRemoveTransaction = {
  id: string;
  type: string;
  category: string;
};

export type TModifyProfile = {
  username: string;
  image: string;
};

export type TChangePassword = {
  password: string;
  repassword: string;
  email: string;
};

export type TModifyPassword = Pick<TChangePassword, "password" | "repassword">;

export type TTransaction = {
  categoryData: TCategory;
  amount: number;
  date: Date | null;
  currency: string;
  _id: string;
};

export type THistory = {
  toast: any;
  transactionArr: TTransaction[];
};

export type TTransactionForm = {
  categoryChoice: {
    icon: string;
    color: string;
    category: string;
    transactionCount: number;
    type: string;
  };
  setCategoryChoice: (choice: {
    icon: string;
    color: string;
    category: string;
    transactionCount: number;
    type: string;
  }) => void;
  setAmount: (amount: number) => void;
  setDate: (date: Date | null) => void;
  amount: number;
  date: Date | null;
};

export type TDisplayNumber = {
  transactionBalance: number;
  income: number;
  expense: number;
  balance: number;
  walletLoading: boolean;
};

export type TNavMenu = {
  setShowSidebar: () => void;
};

export type TIconCustomize = {
  setColorSelected: (color: string) => void;
  setIconSelected: (iconPath: string) => void;
  iconRef: MutableRefObject<HTMLDivElement | null>;
  showIconCustomize: boolean;
};

export type TShowType = {
  typeRef: MutableRefObject<HTMLDivElement | null>;
  setTypeSelected: (type: string) => void;
  setShowType: (bool: boolean) => void;
  showType: boolean;
};

export type TNewIconCustomize = {
  setNewColorSelected: (color: string) => void;
  setNewIconSelected: (iconPath: string) => void;
  newIconRef: MutableRefObject<HTMLDivElement | null>;
  showNewIconCustomize: boolean;
  categoryToEdit: string;
  ex: TCategory;
};

export type TEditCategory = {
  setEditCategory: (editCategory: boolean) => void;
  setNewCategoryName: (newCategoryName: string) => void;
  setNewColorSelected: (newColorSelected: string) => void;
  newIconToggleRef: MutableRefObject<HTMLDivElement | null>;
  newCategoryName: string;
  newColorSelected: string;
  newIconSelected: string;
  setShowNewIconCustomize: (showNewIconCustomize: boolean) => void;
  showNewIconCustomize: boolean;
  ex: TCategory;
  editCategory: boolean;
  categoryToEdit: string;
};

export type TIslanPassword = {
  setPassword: (password: string) => void;
  setRepassword: (repassword: string) => void;
  password: string;
  repassword: string;
  setChangePasswordMode: (changePasswordMode: boolean) => void;
  changePasswordMode: boolean;
};

export type TAccountDetails = {
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  setUsername: (username: string) => void;
  username: string;
  email: string;
  setChangePasswordMode: (changePasswordMode: boolean) => void;
  changePasswordMode: boolean;
  isLoading: boolean;
};

export type TChartComponentProps = {
  balance: number;
  income: number;
  transactionArr: TTransaction[];
  view: string;
  handleBalanceChange: (newBalance: number) => void;
};

export type TReviews = {
  reviewsRef: MutableRefObject<HTMLDivElement | null>;
};

export type TPricing = {
  pricingRef: MutableRefObject<HTMLDivElement | null>;
};

export type TNavbar = {
  featuresRef: MutableRefObject<HTMLDivElement | null>;
  reviewsRef: MutableRefObject<HTMLDivElement | null>;
  pricingRef: MutableRefObject<HTMLDivElement | null>;
};

export type TFeatures = {
  featuresRef: MutableRefObject<HTMLDivElement | null>;
};
