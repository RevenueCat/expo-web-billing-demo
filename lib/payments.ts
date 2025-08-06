import { usePaymentsConfig } from "@/hooks/usePaymentsConfig";
import { useState } from "react";
import { useEffect } from "react";
import Purchases, {
  PurchasesPackage,
  CustomerInfo,
} from "react-native-purchases";

export const initializePayments = async (apiKey: string) => {
  await Purchases.configure({
    apiKey
  });
};

export const usePackages = () => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const offerings = await Purchases.getOfferings();
        console.log("offerings", offerings);
        setPackages(offerings.current?.availablePackages ?? []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    await Purchases.purchasePackage(pkg);
  };

  return { packages, isLoading, purchasePackage };
};

export const useCustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        setIsLoading(true);
        const info = await Purchases.getCustomerInfo();
        setCustomerInfo(info);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();

    // Set up listener for customer info updates
    const customerInfoUpdated = (info: CustomerInfo) => {
      setCustomerInfo(info);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
    };
  }, []);

  const hasActiveEntitlement = (entitlementId: string) => {
    return !!customerInfo?.entitlements.active[entitlementId];
  };

  return {
    customerInfo,
    isLoading,
    hasActiveEntitlement,
  };
};
