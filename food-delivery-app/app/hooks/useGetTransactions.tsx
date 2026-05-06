import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useGetUserInfo } from "./useGetUserInfo";
export default function useGetTransactions() {
  const { userID } = useGetUserInfo();
  const [transactions, setTransactions] = useState<any[]>([]);
  const transactionCollectionRef = collection(db, "transactions");
  useEffect(() => {
    let unsubscribe: any;

    const getTransactions = async () => {
      if (!userID) return;
      try {
        const queryTransactions = query(
          transactionCollectionRef,
          where("userID", "==", userID),
          orderBy("createdAt")
        );
        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          let loadedTransactions: any[] = [];
          snapshot.docs.forEach((doc) => {
            loadedTransactions.push({ ...doc.data(), id: doc.id });
          });
          setTransactions(loadedTransactions);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userID]);
  return { transactions };
}
