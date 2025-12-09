import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'PLEARN',
  webDir: '.next',
  server: {
    url: 'https://plearn-zeta.vercel.app/',
    cleartext: true,
  },
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#000000',
      statusBarStyle: 'DARK',
      navigationBarColor: '#000000',
      navigationBarStyle: 'DARK',
    },
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#000000',
    },
    Keyboard: {
      resize: 'native',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
  },
}

export default config
