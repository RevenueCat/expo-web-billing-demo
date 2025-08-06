import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCustomerInfo } from "@/lib/payments";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    <ThemedText style={styles.value}>{value}</ThemedText>
  </View>
);

const StackedInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stackedInfoRow}>
    <ThemedText style={styles.stackedLabel}>{label}</ThemedText>
    <ThemedText style={styles.stackedValue}>{value}</ThemedText>
  </View>
);

export default function ProfileScreen() {
  const { customerInfo } = useCustomerInfo();

  const activeEntitlements = Object.entries(
    customerInfo?.entitlements.active || {}
  );
  const purchaseHistory = Object.entries(customerInfo?.allPurchaseDates || {});

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.sectionTitle}>Account Information</ThemedText>
        <StackedInfoRow
          label="Customer ID"
          value={customerInfo?.originalAppUserId || "Not available"}
        />
        <View style={styles.divider} />

        <ThemedText style={styles.sectionTitle}>
          Active Subscriptions
        </ThemedText>
        {activeEntitlements.length > 0 ? (
          activeEntitlements?.map(([id, entitlement], index) => (
            <View key={id}>
              <InfoRow
                label={id}
                value={new Date(
                  entitlement.expirationDate || 0
                ).toLocaleDateString()}
              />
              {index < activeEntitlements.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))
        ) : (
          <ThemedText style={styles.emptyText}>
            No active subscriptions
          </ThemedText>
        )}

        <View style={styles.divider} />
        <ThemedText style={styles.sectionTitle}>Purchase History</ThemedText>
        {purchaseHistory.length > 0 ? (
          purchaseHistory.map(([productId, date], index) => (
            <View key={productId}>
              <InfoRow
                label={productId}
                value={new Date(date || 0).toLocaleDateString()}
              />
              {index < purchaseHistory.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))
        ) : (
          <ThemedText style={styles.emptyText}>No purchase history</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    opacity: 0.8,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 4,
  },
  emptyText: {
    fontSize: 15,
    opacity: 0.6,
    fontStyle: "italic",
    paddingVertical: 8,
  },
  stackedInfoRow: {
    paddingVertical: 12,
  },
  stackedLabel: {
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 4,
  },
  stackedValue: {
    fontSize: 15,
    fontWeight: "500",
  },
});
