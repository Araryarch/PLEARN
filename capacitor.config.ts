import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'plearn',
  webDir: 'out',
  server: {
    url: 'https://plearn-zeta.vercel.app/', // ganti sesuai URL deploy kamu
    cleartext: true, // biar gak error di Android 9+
  },
}

export default config
