import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'plearn',
  server: {
    url: 'https://plearn-zeta.vercel.app/',
    cleartext: true,
  },
}

export default config
