import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for a single transaction
type Transaction = {
  id: number;
  amount: number;
  account: {
    name: string;
    iban: string;
  };
};

// Define the context's value type
type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (amount: string, account: { name: string; iban: string }) => void;
  balance: number;
};

// Create the context with a default value
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Custom hook to use the TransactionContext
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

// Define the props type for TransactionProvider
type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  // Set up the state with appropriate types
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(1000);

  // Function to add a transaction
  const addTransaction = (
    amount: string,
    account: {
      name: string;
      iban: string;
    },
  ) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setBalance((prevBalance) => prevBalance - parseFloat(amount));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};
