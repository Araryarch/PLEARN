import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'plearn',
  webDir: '.next',
  server: {
    url: 'https://plearn-zeta.vercel.app/',
    cleartext: true,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#ffffffff',
    },
  },
}

export default config
