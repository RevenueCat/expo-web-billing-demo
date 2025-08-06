import { createContext, useContext } from "react";

export interface PaymentsContextType {
  isConfigured: boolean;
}

export const PaymentsContext = createContext<PaymentsContextType>({
  isConfigured: false,
});

export const usePaymentsConfig = () => useContext(PaymentsContext);
