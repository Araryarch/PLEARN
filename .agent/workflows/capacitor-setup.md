---
description: Setup Capacitor for Mobile Optimization
---

# Capacitor Setup Workflow

This workflow will setup Capacitor for mobile optimization including safe-area, voice recording, and other mobile-specific features.

## Prerequisites

- Next.js app already running
- Bun package manager installed

## Step 1: Install Capacitor Core & CLI

```bash
bun add @capacitor/core @capacitor/cli
```

## Step 2: Initialize Capacitor

```bash
bunx cap init
```

When prompted:

- App name: `PLEARN`
- App ID: `com.plearn.app`
- Web directory: `out` (for Next.js static export)

## Step 3: Install Required Plugins

```bash
bun add @capacitor/app @capacitor/status-bar @capacitor/keyboard capacitor-plugin-safe-area
```

## Step 4: Add Platform (Android/iOS)

For Android:

```bash
bunx cap add android
```

For iOS:

```bash
bunx cap add ios
```

## Step 5: Update next.config.js for Static Export

Add to `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

## Step 6: Create Capacitor Config

Create `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.plearn.app',
  appName: 'PLEARN',
  webDir: 'out',
  server: {
    androidScheme: 'https',
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
      style: 'DARK',
      backgroundColor: '#000000',
    },
    Keyboard: {
      resize: 'native',
      style: 'DARK',
    },
  },
}

export default config
```

## Step 7: Create Safe Area Hook

Create `src/hooks/useSafeArea.ts`:

```typescript
import { useEffect, useState } from 'react'
import { SafeArea } from 'capacitor-plugin-safe-area'

export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const getSafeArea = async () => {
      try {
        const area = await SafeArea.getSafeAreaInsets()
        setSafeArea(area.insets)
      } catch (error) {
        console.log('Safe area not available:', error)
      }
    }

    getSafeArea()

    // Listen for orientation changes
    const listener = SafeArea.addListener('safeAreaChanged', (data) => {
      setSafeArea(data.insets)
    })

    return () => {
      listener.remove()
    }
  }, [])

  return safeArea
}
```

## Step 8: Apply Safe Area to Layout

Update `src/Layouts/Layouts.tsx` to use safe area:

```typescript
import { useSafeArea } from '@/hooks/useSafeArea';

export default function Layouts({ children }: { children: React.ReactNode }) {
  const safeArea = useSafeArea();

  return (
    <div
      style={{
        paddingTop: `${safeArea.top}px`,
        paddingBottom: `${safeArea.bottom}px`,
        paddingLeft: `${safeArea.left}px`,
        paddingRight: `${safeArea.right}px`,
      }}
    >
      {/* existing layout */}
    </div>
  );
}
```

## Step 9: Update Voice Recognition to Use Capacitor

For better mobile support, consider using Capacitor's native voice recording instead of Web Speech API.

Install voice recorder plugin:

```bash
bun add @capacitor-community/speech-recognition
```

Update `useSpeechRecognition.ts` to use Capacitor plugin on mobile.

## Step 10: Build and Sync

```bash
bun run build
bunx cap sync
```

## Step 11: Run on Device

For Android:

```bash
bunx cap open android
```

For iOS:

```bash
bunx cap open ios
```

## Additional Optimizations

### 1. Add Splash Screen

```bash
bun add @capacitor/splash-screen
```

### 2. Add Haptics

```bash
bun add @capacitor/haptics
```

### 3. Add Network Detection

```bash
bun add @capacitor/network
```

## Testing Checklist

- [ ] Safe area properly applied on notched devices
- [ ] Status bar color matches app theme
- [ ] Keyboard doesn't cover input fields
- [ ] Voice recording works on mobile
- [ ] All gestures work properly
- [ ] No content cut off on top/bottom

## Troubleshooting

**Issue: Safe area not working**

- Make sure `capacitor-plugin-safe-area` is properly installed
- Check that the plugin is configured in `capacitor.config.ts`
- Verify the app is running on a real device (not simulator)

**Issue: Build fails**

- Make sure `output: 'export'` is set in `next.config.js`
- Check that all images have `unoptimized: true`
- Verify no server-side only features are used

**Issue: Voice not working**

- Check microphone permissions in app settings
- Verify Capacitor plugin is properly configured
- Test on real device (not emulator)
