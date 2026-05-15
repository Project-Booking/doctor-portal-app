/**
 * Login Screen — Production-quality auth UI with form validation,
 * loading states, and accessibility.
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Platform, ScrollView, Image, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { validateEmail, validatePassword } from '@/utils/validation';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL, FONT_3XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, SHADOW_MD,
} from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    const emailResult = validateEmail(email);
    const passResult  = validatePassword(password);
    setErrors({ email: emailResult.error ?? '', password: passResult.error ?? '' });
    return emailResult.valid && passResult.valid;
  };

  const handleLogin = async () => {
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (!result.success) {
      setServerError(result.error ?? 'Login failed. Please try again.');
      return;
    }

    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset password',
      'If you forgot your password, please contact your administrator or use the password recovery workflow in your clinic portal.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Brand ── */}
          <View style={styles.brand}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🏥</Text>
            </View>
            <Text style={styles.appName}>DoctorPortal</Text>
            <Text style={styles.tagline}>Your OPD Management Hub</Text>
          </View>

          {/* ── Card ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSub}>Sign in to your account</Text>

            {serverError ? (
              <View style={styles.errorBanner} accessibilityRole="alert">
                <Text style={styles.errorBannerText}>⚠ {serverError}</Text>
              </View>
            ) : null}

            <FormField
              label="Email Address"
              value={email}
              onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="doctor@demo.com"
              error={errors.email}
              required
            />

            <View>
              <FormField
                label="Password"
                value={password}
                onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: '' })); }}
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                error={errors.password}
                required
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword((p) => !p)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              >
                <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotLink}
              onPress={handleForgotPassword}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              label="Sign In"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
              disabled={loading}
            />

            {/* Demo hint */}
            <View style={styles.demoHint}>
              <Text style={styles.demoText}>Demo: doctor@demo.com / demo123</Text>
            </View>
          </View>

          {/* ── Footer ── */}
          <Text style={styles.footer}>
            By signing in, you agree to our{' '}
            <Text style={styles.footerLink}>Terms of Service</Text>{' '}
            and{' '}
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: PRIMARY_BG },
  kav:    { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: SPACE_LG, paddingVertical: SPACE_2XL },

  brand:      { alignItems: 'center', marginBottom: SPACE_2XL },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: PRIMARY, justifyContent: 'center', alignItems: 'center', marginBottom: SPACE_MD, ...SHADOW_MD },
  logoIcon:   { fontSize: 36 },
  appName:    { fontSize: FONT_3XL, fontWeight: '900', color: PRIMARY, letterSpacing: -0.5 },
  tagline:    { fontSize: FONT_SM, color: GRAY_500, marginTop: 4 },

  card:       { backgroundColor: WHITE, borderRadius: RADIUS_XL + 4, padding: SPACE_2XL, borderWidth: 1, borderColor: GRAY_200, ...SHADOW_MD },
  cardTitle:  { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900, marginBottom: 4 },
  cardSub:    { fontSize: FONT_SM, color: GRAY_500, marginBottom: SPACE_XL },

  errorBanner:     { backgroundColor: '#FEE2E2', borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_MD, borderWidth: 1, borderColor: DANGER },
  errorBannerText: { color: DANGER, fontSize: FONT_SM, fontWeight: '600' },

  eyeBtn:  { position: 'absolute', right: 12, bottom: 34 },
  eyeText: { fontSize: 18 },

  forgotLink: { alignSelf: 'flex-end', marginBottom: SPACE_LG },
  forgotText: { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600' },

  demoHint: { marginTop: SPACE_LG, padding: SPACE_MD, backgroundColor: PRIMARY_SUBTLE, borderRadius: RADIUS_LG, alignItems: 'center' },
  demoText: { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600' },

  footer:     { textAlign: 'center', fontSize: FONT_SM - 1, color: GRAY_400, marginTop: SPACE_XL, lineHeight: 20 },
  footerLink: { color: PRIMARY, fontWeight: '600' },
});
