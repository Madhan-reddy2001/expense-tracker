"use client";
import { useState, useMemo } from "react";
import { userAddTransaction } from "../hooks/useTransactions";
import useGetTransactions from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function ExpenseTracker() {
  const { addTransaction } = userAddTransaction();
  const { transactions } = useGetTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const { name, profilePhoto } = useGetUserInfo();
  const router = useRouter();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((t: { transactionType: string; transactionAmount: string | number }) => {
      const amount = Number(t.transactionAmount) || 0;
      if (t.transactionType === "income") income += amount;
      else expense += amount;
    });
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  const signout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !transactionAmount) return;
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <h1>💰 Expense Tracker</h1>
        <div className="tracker-user">
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt={name || "User"}
              referrerPolicy="no-referrer"
            />
          )}
          {name && <span style={{ fontWeight: 600 }}>{name}</span>}
          <button className="btn-danger" onClick={signout}>
            Logout
          </button>
        </div>
      </div>

      <div className="balance-card">
        <h3>Your Balance</h3>
        <h2>₹{balance.toFixed(2)}</h2>
      </div>

      <div className="summary-row">
        <div className="summary-box income">
          <h4>Income</h4>
          <p>₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-box expense">
          <h4>Expense</h4>
          <p>₹{totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <form className="tracker-form" onSubmit={onSubmit}>
        <h3>Add Transaction</h3>
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            Expense
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="type"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            Income
          </label>
        </div>
        <button type="submit" className="btn-primary submit-btn">
          Add Transaction
        </button>
      </form>

      <div className="transactions-list">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No transactions yet. Add one above!
          </p>
        ) : (
          transactions.map((transaction: { id: string; description: string; transactionAmount: string | number; transactionType: string }) => (
            <div key={transaction.id} className="transaction-item">
              <h4>{transaction.description}</h4>
              <span
                className={`transaction-amount ${transaction.transactionType}`}
              >
                {transaction.transactionType === "income" ? "+" : "-"}₹
                {Number(transaction.transactionAmount).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
