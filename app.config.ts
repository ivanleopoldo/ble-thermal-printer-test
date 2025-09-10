import { ExpoConfig, ConfigContext } from 'expo/config';

const NAME = 'BLE Printer';
const SLUG = 'ble-thermal-printer-test';
const BUNDLE_IDENTIFIER = 'com.ivaintwc.blethermalprintertest';
const PACKAGE_NAME = 'com.ivaintwc.blethermalprintertest';
const SCHEME = 'BLEPrinter';

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, slug, bundleIdentifier, scheme, packageName } = getEnv(
    (process.env.APP_ENV as 'production' | 'preview' | 'development') || 'development'
  )!;

  return {
    ...config,
    name,
    slug,
    version: '1.0.0',
    scheme,
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-dev-launcher',
        {
          launchMode: 'most-recent',
        },
      ],
      'expo-web-browser',
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      infoPlist: {
        NSBluetoothAlwaysUsageDescription:
          'BLE Printer Test needs access to Bluetooth to connect to BLE thermal printers.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: packageName,
    },
    extra: {
      router: {},
      eas: {
        projectId: '4dfc5a38-00de-47ff-bad0-b1a6596d5844',
      },
    },
  };
};

function getEnv(environment: 'production' | 'preview' | 'development') {
  if (environment === 'production') {
    return {
      name: NAME,
      slug: SLUG,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      scheme: SCHEME,
      packageName: PACKAGE_NAME,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${NAME} (Prev)`,
      slug: `${SLUG}prev`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}prev`,
      scheme: `${SCHEME}prev`,
      packageName: `${PACKAGE_NAME}prev`,
    };
  }

  if (environment === 'development') {
    return {
      name: `${NAME} (Dev)`,
      slug: `${SLUG}dev`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}dev`,
      scheme: `${SCHEME}dev`,
      packageName: `${PACKAGE_NAME}dev`,
    };
  }
}
