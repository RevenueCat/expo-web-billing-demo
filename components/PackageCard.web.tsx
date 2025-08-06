import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Package } from "@revenuecat/purchases-js";

type Props = {
  pkg: Package;
  purchasePackage: (pkg: Package) => void;
};

export const PackageCard = ({ pkg, purchasePackage }: Props) => {
  return (
    <TouchableOpacity
      key={pkg.identifier}
      style={styles.card}
      onPress={() => purchasePackage(pkg)}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedText style={styles.packageTitle}>
          {pkg.webBillingProduct.title}
        </ThemedText>
        <ThemedText style={styles.packageType}>{pkg.packageType}</ThemedText>
        <ThemedText style={styles.price}>
          {pkg.webBillingProduct.currentPrice.formattedPrice}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

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
});
