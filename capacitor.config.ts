import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'PLEARN',
  webDir: 'out',

  server: {
    url: 'https://plearn-zeta.vercel.app/',
    cleartext: true,
    allowNavigation: [
      'plearn-zeta.vercel.app',
      '*.vercel.app',
      '*.googleapis.com',
    ],
  },

  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#00000000',
      statusBarStyle: 'DARK',
      navigationBarColor: '#000000',
      navigationBarStyle: 'DARK',
    },
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#00000000',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#000000',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },

  android: {
    backgroundColor: '#000000',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },

  ios: {
    backgroundColor: '#000000',
    contentInset: 'automatic',
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
}

export default config
