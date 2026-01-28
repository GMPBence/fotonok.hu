import { createContext, useContext, useState } from 'react'


const LoadingContext = createContext(undefined);
const BillingContext = createContext(undefined);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }

    return context;
};

export const BillingProvider = ({ children }) => {
    const [isReceiptNeeded, setIsReceiptNeeded] = useState(false);
    const [billingData, setBillingData] = useState();

    return (
        <BillingContext.Provider value={{ isReceiptNeeded, setIsReceiptNeeded, billingData, setBillingData }}>
            {children}
        </BillingContext.Provider>
    );
};

export const useBilling = () => {
    const context = useContext(BillingContext);

    if (!context) {
        throw new Error("useBilling must be used within a BillingProvider");
    }

    return context;
};