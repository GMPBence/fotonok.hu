import { useContext } from "react";
import { BillingContext, LoadingContext } from "./contexts";

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};

export const useBilling = () => {
  const context = useContext(BillingContext);

  if (!context) {
    throw new Error("useBilling must be used within a BillingProvider");
  }

  return context;
};
