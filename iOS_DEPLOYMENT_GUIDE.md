# iOS iPhone 16 Deployment Guide

## Overview
This guide walks you through deploying the DoctorPortal app to an iPhone 16 using EAS Cloud Build (Expo Application Services). This approach works from Windows and doesn't require a Mac.

## Prerequisites Checklist
- [x] Node.js v24.15.0 installed
- [x] npm 11.12.1 installed
- [ ] Expo account (create at https://expo.dev)
- [ ] Apple ID (required for TestFlight)
- [ ] iPhone 16 with TestFlight app installed

## Complete Step-by-Step Process

### Phase 1: Account Setup (Do Once)

#### Step 1.1: Create Expo Account
1. Go to https://expo.dev
2. Click "Sign Up"
3. Enter email, username, and password
4. Verify your email address
5. Save your credentials securely

#### Step 1.2: Enroll in Free Apple Developer Program
1. Go to https://developer.apple.com
2. Click "Account" → Sign in with your existing Apple ID
3. Enroll in **Apple Developer Program** (FREE - no $99 charge needed for TestFlight)
4. Accept terms and agreements
5. Your regular Apple ID now has developer access!

### Phase 2: Build Configuration (Do Once)

#### Step 2.1: Install EAS CLI globally
```powershell
npm install -g eas-cli
```

#### Step 2.2: Navigate to project
```powershell
cd "c:\Users\prani\Desktop\opd1\DoctorPortalApp"
```

#### Step 2.3: Login to Expo
```powershell
eas login
```
When prompted:
- Enter your Expo email or username
- Enter your password
- Press Enter to confirm

#### Step 2.4: Initialize EAS (first time only)
```powershell
eas build:configure
```
This creates/updates eas.json and app.json with necessary settings.

### Phase 3: Build for iOS

#### Step 3.1: Trigger iOS Build
```powershell
eas build --platform ios --auto-submit
```

Options:
- `--auto-submit`: Automatically submits to TestFlight (recommended)
- `--profile production`: For production build (requires certificates)
- `--profile preview`: For testing without auto-submit

#### Step 3.2: Monitor Build Progress
```powershell
eas build:list
```

You'll also receive email updates from Expo.

### Phase 4: Deploy to iPhone 16

#### Step 4.1: Wait for Build Completion
- Build takes 10-20 minutes
- You'll receive email: "Build completed successfully"
- Email includes download link (optional for TestFlight)

#### Step 4.2: Accept TestFlight Invite
1. Check email for TestFlight invite from App Store Connect
2. Click the link in the email
3. Accept the invite
4. Open TestFlight app on iPhone 16
5. Find "DoctorPortal" app
6. Tap "Install" to download and install

#### Step 4.3: Launch App on iPhone 16
1. Open TestFlight on iPhone 16
2. Tap "DoctorPortal"
3. Tap "Open" (or wait for auto-launch)
4. App launches on your iPhone 16!

## Troubleshooting

### Issue: "Build failed" or "Build expired"
**Solution:**
```powershell
eas build --platform ios --auto-submit
```
Try building again.

### Issue: TestFlight invite not received
**Solution:**
1. Check spam folder in email
2. Verify Apple ID email in app.json:
   ```json
   "ios": {
     "appleId": "your-actual-apple-id@example.com"
   }
   ```
3. Wait 24 hours and try again

### Issue: App crashes on launch
**Solution:**
1. Check build logs:
   ```powershell
   eas build:view <build-id>
   ```
2. Check app logs on iPhone:
   - Settings → Diagnostics → Analytics Data
3. Restart iPhone and retry

### Issue: "Certificate error"
**Solution:**
This is handled automatically by EAS. Just retry the build:
```powershell
eas build --platform ios --auto-submit
```

## Subsequent Builds

For future app updates:

```powershell
cd "c:\Users\prani\Desktop\opd1\DoctorPortalApp"

# Make code changes
# ... edit your files ...

# Increment version in app.json
{
  "expo": {
    "version": "1.0.1"  // Changed from 1.0.0
  }
}

# Build and deploy
eas build --platform ios --auto-submit
```

## Advanced Options

### Custom Build Profile
Edit eas.json to create custom profiles:
```json
{
  "build": {
    "testing": {
      "ios": {
        "simulator": false,
        "distribution": "internal"
      }
    },
    "production": {
      "ios": {
        "simulator": false,
        "distribution": "app-store"
      }
    }
  }
}
```

Then build with:
```powershell
eas build --platform ios --profile testing --auto-submit
```

### Manual Submission to App Store
```powershell
eas submit --platform ios
```

## Summary of Changes Made

✅ Created `app.json` with iOS configuration
✅ Created `eas.json` with build profiles
✅ Updated `package.json` with Expo dependencies
✅ Ready for iPhone 16 deployment!

## Next Steps

1. Create Expo account at https://expo.dev
2. Run: `eas login`
3. Run: `eas build:configure`
4. Run: `eas build --platform ios --auto-submit`
5. Accept TestFlight invite on your email
6. Install from TestFlight on iPhone 16

Questions? Check EAS documentation: https://docs.expo.dev/
