import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'plearn',
  webDir: '.next',
  server: {
    url: 'https://plearn-zeta.vercel.app/', // hosted Next.js
    cleartext: true,
  },
  plugins: {
    App: { urlOpen: true }, // supaya app bisa handle deep link
  },
}

export default config
