![RevenueCat Web Billing Tutorial Cover](@cover.png)

# RevenueCat Web Billing Tutorial - Example Repository

This is the complete example repository for the [RevenueCat blog article](https://www.revenuecat.com/blog/engineering/build-a-single-expo-app-with-subscriptions-on-ios-android-and-web-using-revenuecat/) on building a single Expo app with subscriptions across iOS, Android, and Web platforms.

## About This Project

This project demonstrates how to implement cross-platform subscriptions using RevenueCat Web Billing and the web SDK. The app works seamlessly across iOS, Android, and Web platforms, allowing users to subscribe on any platform and unlock premium access everywhere.

The tutorial walks through building a simple React Native app with Expo that implements RevenueCat subscriptions across all three platforms. We minimize platform-specific code while covering all key setup steps.

## Key Features

- **Cross-platform subscriptions**: Single codebase supporting iOS, Android, and Web
- **RevenueCat integration**: Unified subscription management across platforms
- **Platform-specific modules**: Uses React Native's platform extensions (.native.ts, .web.ts)
- **Expo Router**: Modern navigation with tab-based interface
- **Unified entitlements**: Shared subscription status across all platforms

## Project Structure

```
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.tsx        # Root layout
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Platform-specific payment logic
│   ├── payments.native.ts  # iOS/Android implementation
│   └── payments.web.ts     # Web implementation
└── constants/              # App constants and colors
```

## Prerequisites

Before starting, you'll need:
- A RevenueCat account
- An App Store Connect account (for iOS)
- A Google Play Console account (for Android)
- A Stripe account (for Web Billing)

## Setup Steps

### 1. RevenueCat Account Setup

1. Visit the RevenueCat website
2. Click "Sign Up" or "Get Started"
3. Follow the on-screen instructions to create your account
4. Verify your email address
5. Access the RevenueCat dashboard to begin configuration

### 2. Platform Configuration

#### 2.1 iOS Setup
1. Log into App Store Connect
2. Navigate to My Apps
3. Select your app
4. Go to Features tab → In-App Purchases
5. Create a new subscription:
   - Reference name: `1_month_premium_ios`
   - Product ID: `1_month_premium_ios`
   - Duration: 1 Month
   - Set appropriate pricing tier
   - Add localized display names and descriptions

#### 2.2 Android Setup
1. Configure Google Play Console connection with RevenueCat
2. Navigate to Google Play Console → App Applications
3. Select Products → Subscriptions
4. Create subscription with matching details to iOS version
5. Add base plan with 1-month auto-renewing period

#### 2.3 Web Billing Setup
1. Go to RevenueCat dashboard
2. Navigate to project settings
3. Under "Products" click "New"
4. Select Web Billing App
5. Configure monthly subscription matching iOS/Android versions

### 3. Implementation

#### Installation
```bash
npm install react-native-purchases
npm install @revenuecat/purchases-js
```

#### Platform-Specific Code
The project uses platform-specific extensions:
- `.native.ts` for iOS and Android
- `.web.ts` for web platform

Key components:
- `initializePayments`: Initializes RevenueCat SDK
- `usePackages`: Handles package display and purchases

## Running the Project

1. Clone this repository
2. Install dependencies: `npm install`
3. Configure your RevenueCat API keys in the hooks
4. Run the development build:
   ```bash
   npx expo run:ios     # For iOS
   npx expo run:android # For Android
   npx expo start --web # For Web
   ```

## Testing

For testing subscriptions:
- **iOS**: Use sandbox testing accounts
- **Android**: Use test accounts
- **Web**: Use Stripe test mode

## Important Notes

- Expo Go does not support react-native-purchases
- Development builds are required for testing
- Platform-specific code is handled through React Native's platform extensions

## Related Resources

- [Original Blog Article](https://www.revenuecat.com/blog/engineering/build-a-single-expo-app-with-subscriptions-on-ios-android-and-web-using-revenuecat/)
- [RevenueCat iOS Setup Guide](https://www.revenuecat.com/docs/ios-products)
- [RevenueCat Android Setup Guide](https://www.revenuecat.com/docs/android-products)
- [RevenueCat Web Billing Guide](https://www.revenuecat.com/docs/web-billing)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)

## License

This project is provided as an example for the RevenueCat blog tutorial. Feel free to use this code as a reference for your own projects.
