/**
 * Site Management Screen — wired to AppContext.
 * Full CRUD for certifications and education using shared context.
 */

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/components/ui/Toast';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { validateRequired } from '@/utils/validation';
import { Certification, Education } from '@/types';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, DANGER_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

export default function SiteManagementScreen() {
  const { certifications, education, addCertification, deleteCertification, addEducation, deleteEducation } = useApp();
  const { showToast } = useToast();

  // Cert modal state
  const [certModal, setCertModal]     = useState(false);
  const [certName, setCertName]       = useState('');
  const [certSubtitle, setCertSubtitle] = useState('');
  const [certErrors, setCertErrors]   = useState<Record<string, string>>({});

  // Edu modal state
  const [eduModal, setEduModal] = useState(false);
  const [newEdu, setNewEdu]     = useState({ degree: '', institution: '', year: '' });
  const [eduErrors, setEduErrors] = useState<Record<string, string>>({});

  // ── Cert handlers ───────────────────────────────────────────────────────────

  const openCertModal = () => {
    setCertName(''); setCertSubtitle(''); setCertErrors({});
    setCertModal(true);
  };

  const saveCert = () => {
    const nameErr = validateRequired(certName, 'Certification name');
    if (!nameErr.valid) {
      setCertErrors({ name: nameErr.error! });
      return;
    }
    addCertification({
      id: Date.now().toString(),
      name: certName.trim(),
      subtitle: certSubtitle.trim() || 'Certified',
    });
    showToast('Certification added', 'success');
    setCertModal(false);
  };

  const handleDeleteCert = (id: string, name: string) => {
    Alert.alert('Remove Certification', `Remove "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: () => {
          deleteCertification(id);
          showToast('Certification removed', 'error');
        },
      },
    ]);
  };

  // ── Edu handlers ────────────────────────────────────────────────────────────

  const openEduModal = () => {
    setNewEdu({ degree: '', institution: '', year: '' });
    setEduErrors({});
    setEduModal(true);
  };

  const saveEdu = () => {
    const degreeErr = validateRequired(newEdu.degree, 'Degree');
    if (!degreeErr.valid) {
      setEduErrors({ degree: degreeErr.error! });
      return;
    }
    addEducation({
      id: Date.now().toString(),
      degree: newEdu.degree.trim(),
      institution: newEdu.institution.trim(),
      year: newEdu.year.trim(),
    });
    showToast('Education entry added', 'success');
    setEduModal(false);
  };

  const handleDeleteEdu = (id: string, degree: string) => {
    Alert.alert('Remove Entry', `Remove "${degree}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove', style: 'destructive',
        onPress: () => {
          deleteEducation(id);
          showToast('Education entry removed', 'error');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">Site Management</Text>
          <Text style={styles.subtitle}>Manage clinic profile, certifications & education</Text>
        </View>

        {/* ── Certifications ── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Button label="+ Add" size="sm" onPress={openCertModal} accessibilityLabel="Add certification" />
          </View>

          {certifications.length === 0 ? (
            <EmptyState icon="🏅" title="No certifications added" actionLabel="+ Add" onAction={openCertModal} />
          ) : (
            certifications.map((c) => (
              <View key={c.id} style={styles.certCard}>
                <View style={styles.certIcon}>
                  <Text style={{ fontSize: 22 }} importantForAccessibility='no-hide-descendants'>🏅</Text>
                </View>
                <View style={styles.certContent}>
                  <Text style={styles.certName}>{c.name}</Text>
                  <Text style={styles.certSub}>{c.subtitle}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteCert(c.id, c.name)}
                  style={styles.deleteBtn}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${c.name}`}
                >
                  <Text style={styles.deleteBtnText} importantForAccessibility='no-hide-descendants'>🗑</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* ── Education ── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Educational Background</Text>
            <Button label="+ Add" size="sm" onPress={openEduModal} accessibilityLabel="Add education" />
          </View>

          {education.length === 0 ? (
            <EmptyState icon="🎓" title="No education entries" actionLabel="+ Add" onAction={openEduModal} />
          ) : (
            education.map((e) => (
              <View key={e.id} style={styles.eduCard}>
                <View style={styles.eduAccent} />
                <View style={styles.eduContent}>
                  <Text style={styles.eduDegree}>{e.degree}</Text>
                  <Text style={styles.eduInst}>{e.institution}</Text>
                  <Text style={styles.eduYear}>Class of {e.year}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteEdu(e.id, e.degree)}
                  style={styles.deleteBtn}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${e.degree}`}
                >
                  <Text style={styles.deleteBtnText} importantForAccessibility='no-hide-descendants'>🗑</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* ── Cert Modal ── */}
      <Modal visible={certModal} animationType="slide" transparent onRequestClose={() => setCertModal(false)} accessibilityViewIsModal>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Certification</Text>
            <FormField
              label="Certification Name"
              value={certName}
              onChangeText={setCertName}
              placeholder="e.g. Board Certified Cardiologist"
              error={certErrors.name}
              required
            />
            <FormField
              label="Issuing Body / Validity"
              value={certSubtitle}
              onChangeText={setCertSubtitle}
              placeholder="e.g. AHA Certified · Valid until 2026"
            />
            <View style={styles.modalBtns}>
              <Button label="Cancel" variant="secondary" onPress={() => setCertModal(false)} />
              <Button label="Add" variant="primary" onPress={saveCert} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Edu Modal ── */}
      <Modal visible={eduModal} animationType="slide" transparent onRequestClose={() => setEduModal(false)} accessibilityViewIsModal>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Education</Text>
            <FormField
              label="Degree"
              value={newEdu.degree}
              onChangeText={(v) => setNewEdu((p) => ({ ...p, degree: v }))}
              placeholder="e.g. MBBS"
              error={eduErrors.degree}
              required
            />
            <FormField
              label="Institution"
              value={newEdu.institution}
              onChangeText={(v) => setNewEdu((p) => ({ ...p, institution: v }))}
              placeholder="e.g. AIIMS, New Delhi"
            />
            <FormField
              label="Year of Completion"
              value={newEdu.year}
              onChangeText={(v) => setNewEdu((p) => ({ ...p, year: v }))}
              placeholder="e.g. 2011"
              keyboardType="numeric"
            />
            <View style={styles.modalBtns}>
              <Button label="Cancel" variant="secondary" onPress={() => setEduModal(false)} />
              <Button label="Add" variant="primary" onPress={saveEdu} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: PRIMARY_BG },
  header:       { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:        { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  section:      { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE_MD },
  sectionTitle: { fontSize: FONT_LG, fontWeight: '700', color: GRAY_900 },

  certCard:    { backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_SM, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  certIcon:    { width: 44, height: 44, borderRadius: 22, backgroundColor: PRIMARY_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: SPACE_MD },
  certContent: { flex: 1 },
  certName:    { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  certSub:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },

  eduCard:    { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, flexDirection: 'row', borderWidth: 1, borderColor: GRAY_200, overflow: 'hidden', ...SHADOW_SM },
  eduAccent:  { width: 4, backgroundColor: PRIMARY },
  eduContent: { flex: 1, padding: SPACE_MD },
  eduDegree:  { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  eduInst:    { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  eduYear:    { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600', marginTop: 2 },

  deleteBtn:     { padding: SPACE_SM },
  deleteBtnText: { fontSize: 20, color: GRAY_400 },

  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal:      { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL },
  modalTitle: { fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: SPACE_LG },
  modalBtns:  { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_SM },
});