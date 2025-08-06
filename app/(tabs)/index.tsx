import { ScrollView, StyleSheet } from "react-native";

import { usePaymentsConfig } from "@/hooks/usePaymentsConfig";
import { useCustomerInfo, usePackages } from "@/lib/payments";

import { PackageCard } from "@/components/PackageCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const SubscriptionStatus = () => {
  const { customerInfo, isLoading } = useCustomerInfo();

  if (isLoading) return null;

  const hasActiveSubscription =
    Object.keys(customerInfo?.entitlements.active || {}).length > 0;

  return (
    <ThemedView style={styles.statusContainer}>
      <ThemedText style={styles.statusText}>
        {hasActiveSubscription
          ? "🎉 You're subscribed! 🎉"
          : "😢 You're currently not subscribed. Purchase any of the packages below to subscribe! ✨"}
      </ThemedText>
    </ThemedView>
  );
};

export default function HomeScreen() {
  const { packages, isLoading, purchasePackage } = usePackages();

  console.log("packages", packages);

  return (
    <ScrollView style={styles.container}>
      <SubscriptionStatus />
      {packages?.map((p) => (
        <PackageCard
          key={p.identifier}
          pkg={p}
          purchasePackage={purchasePackage}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "600",
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    padding: 16,
    borderRadius: 12,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  packageType: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  statusContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  statusText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
