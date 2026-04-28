import { useState } from 'react'
import { BillingContext, LoadingContext } from './contexts'

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
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
