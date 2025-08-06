import { usePaymentsConfig } from "@/hooks/usePaymentsConfig";
import {
  CustomerInfo,
  ErrorCode,
  Package,
  Purchases,
} from "@revenuecat/purchases-js";
import { useEffect, useState } from "react";

export const initializePayments = async (apiKey: string) => {
  const appUserId = Purchases.generateRevenueCatAnonymousAppUserId();
  Purchases.configure(apiKey, appUserId);
};

export const offeringId = "default";

export const webReset = () => {
  // Remove all styles from the html and body tags after completing RevenueCat purchase
  // this is needed as during the purchase process, the body tag is styled with styles which
  // override the default styles of the Expo app
  ["html", "body"].forEach((tag) =>
    document.querySelector(tag)?.removeAttribute("style")
  );
};

export const usePackages = () => {
  const { isConfigured } = usePaymentsConfig();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isConfigured) return;

    const fetchPackages = async () => {
      const offerings = await Purchases.getSharedInstance().getOfferings();
      setPackages(offerings.all[offeringId].availablePackages);
    };

    fetchPackages();
  }, [isConfigured]);

  const purchasePackage = async (pkg: Package) => {
    try {
      const { customerInfo } = await Purchases.getSharedInstance().purchase({
        rcPackage: pkg,
      });
      return customerInfo;
    } catch (error) {
      console.log(error);
      if (error === ErrorCode.UserCancelledError) {
        return null;
      }
    } finally {
      webReset();
    }
  };

  return { packages, isLoading, purchasePackage };
};

export const useCustomerInfo = () => {
  const isConfigured = usePaymentsConfig();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConfigured) return;

    const fetchCustomerInfo = async () => {
      try {
        setIsLoading(true);
        const info = await Purchases.getSharedInstance().getCustomerInfo();
        setCustomerInfo(info);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();
  }, [isConfigured]);

  const hasActiveEntitlement = (entitlementId: string) => {
    return !!customerInfo?.entitlements.active[entitlementId];
  };

  return {
    customerInfo,
    isLoading,
    hasActiveEntitlement,
  };
};
