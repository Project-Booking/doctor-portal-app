/**
 * FormField — accessible labelled TextInput with validation error display.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import {
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, PRIMARY,
  FONT_SM, FONT_MD, SPACE_SM, SPACE_MD, RADIUS_LG,
} from '../../constants/theme';

interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function FormField({ label, error, hint, required, ...inputProps }: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.group} accessibilityLabel={label}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        {...inputProps}
        style={[
          styles.input,
          inputProps.multiline && styles.textArea,
          focused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
        placeholderTextColor={GRAY_400}
        onFocus={(e) => {
          setFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          inputProps.onBlur?.(e);
        }}
        accessibilityLabel={label}
        accessibilityHint={hint}
        
        
      />
      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group:        { marginBottom: SPACE_MD },
  label:        { fontSize: FONT_SM, fontWeight: '600', color: GRAY_600, marginBottom: 6 },
  required:     { color: DANGER },
  input:        {
    backgroundColor: GRAY_100,
    borderRadius: RADIUS_LG,
    paddingHorizontal: SPACE_MD,
    paddingVertical: SPACE_MD,
    fontSize: FONT_MD,
    borderWidth: 1,
    borderColor: GRAY_200,
    color: GRAY_900,
  },
  textArea:     { height: 90, paddingTop: SPACE_MD, textAlignVertical: 'top' },
  inputFocused: { borderColor: PRIMARY, borderWidth: 1.5 },
  inputError:   { borderColor: DANGER },
  errorText:    { fontSize: FONT_SM, color: DANGER, marginTop: 4 },
  hintText:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 4 },
});
