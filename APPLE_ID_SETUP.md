# Apple ID Setup for iOS Build - FREE Option

## You Don't Need Paid Developer Account!

### Quick Facts:
✅ Use your regular Apple ID (the one you use for iPhone)
✅ Enroll in FREE Apple Developer Program (no $99 fee for TestFlight)
✅ EAS automatically creates all certificates and profiles
✅ TestFlight distribution is FREE

## 3-Minute Setup:

1. **Go to:** https://developer.apple.com/account/
2. **Sign in** with your regular Apple ID
3. **Click:** "Enroll in Apple Developer Program"
4. **Select:** Free enrollment option
5. **Accept** terms and conditions
6. **Done!** Your Apple ID now has developer access

## Then Run Build:

```powershell
cd "c:\Users\prani\Desktop\opd1\DoctorPortalApp"
$env:EAS_NO_VCS=1; $env:EAS_BUILD_NO_EXPO_GO_WARNING=1; eas build --platform ios
```

## When Prompted:
- **Apple ID:** your-email@example.com (your regular Apple ID)
- **Password:** Your Apple account password
- **2FA Code:** (if enabled - check your devices)

## What Happens Next:
1. EAS creates certificates → ✅ Automatic
2. EAS creates profiles → ✅ Automatic  
3. App builds on cloud → ⏳ 10-20 minutes
4. TestFlight invite sent → 📧 Check email
5. Install on iPhone 16 → 📱 Open TestFlight app

**Total time:** ~30 minutes (mostly waiting for build)

## Is This Safe?
✅ Yes! EAS is made by Expo (creators of React Native)
✅ Your credentials only used for build process
✅ No access to your personal data
✅ Standard industry practice

**You're ready to go!**
