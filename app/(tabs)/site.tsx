import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,
  Modal, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIMARY, PRIMARY_BG, PRIMARY_SUBTLE, WHITE,
  GRAY_100, GRAY_200, GRAY_400, GRAY_500, GRAY_600, GRAY_900,
  DANGER, DANGER_BG,
  FONT_SM, FONT_MD, FONT_LG, FONT_XL, FONT_2XL,
  SPACE_SM, SPACE_MD, SPACE_LG, SPACE_XL, SPACE_2XL,
  RADIUS_LG, RADIUS_XL, RADIUS_FULL, SHADOW_SM,
} from '@/constants/theme';

interface Cert { id: string; name: string; subtitle: string; }

const INIT_CERTS: Cert[] = [
  { id: '1', name: 'Medical Council Registration', subtitle: 'Valid until Dec 2026' },
  { id: '2', name: 'Board Certified Cardiologist',  subtitle: 'RGUHS Board Certified' },
  { id: '3', name: 'ACLS — Advanced Cardiac Life Support', subtitle: 'AHA Certified' },
  { id: '4', name: 'Basic Life Support (BLS)',      subtitle: 'AHA Certified' },
];

interface EduEntry { id: string; degree: string; institution: string; year: string; }

const INIT_EDU: EduEntry[] = [
  { id: '1', degree: 'MBBS',                    institution: 'Medical College of India', year: '2005' },
  { id: '2', degree: 'MD (Internal Medicine)',   institution: 'Delhi University',          year: '2008' },
  { id: '3', degree: 'DM Cardiology',            institution: 'AIIMS, New Delhi',          year: '2011' },
];

export default function SiteManagementScreen() {
  const [certs, setCerts]           = useState<Cert[]>(INIT_CERTS);
  const [edu, setEdu]               = useState<EduEntry[]>(INIT_EDU);
  const [certModal, setCertModal]   = useState(false);
  const [eduModal, setEduModal]     = useState(false);
  const [newCert, setNewCert]       = useState('');
  const [newEdu, setNewEdu]         = useState({ degree: '', institution: '', year: '' });

  const addCert = () => {
    if (!newCert.trim()) return;
    setCerts([...certs, { id: Date.now().toString(), name: newCert.trim(), subtitle: 'New Certification' }]);
    setNewCert(''); setCertModal(false);
  };

  const addEdu = () => {
    if (!newEdu.degree.trim()) { Alert.alert('Error', 'Please enter a degree.'); return; }
    setEdu([...edu, { id: Date.now().toString(), ...newEdu }]);
    setNewEdu({ degree: '', institution: '', year: '' }); setEduModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Site Management</Text>
          <Text style={styles.subtitle}>Manage clinic profile, certifications & education</Text>
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => setCertModal(true)}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {certs.map((c) => (
            <View key={c.id} style={styles.certCard}>
              <View style={styles.certIcon}><Text style={{ fontSize: 22 }}>🏅</Text></View>
              <View style={styles.certContent}>
                <Text style={styles.certName}>{c.name}</Text>
                <Text style={styles.certSub}>{c.subtitle}</Text>
              </View>
              <TouchableOpacity onPress={() => setCerts(certs.filter((x) => x.id !== c.id))}>
                <Text style={styles.deleteBtn}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Educational Background</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => setEduModal(true)}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {edu.map((e) => (
            <View key={e.id} style={styles.eduCard}>
              <View style={styles.eduAccent} />
              <View style={styles.eduContent}>
                <Text style={styles.eduDegree}>{e.degree}</Text>
                <Text style={styles.eduInst}>{e.institution}</Text>
                <Text style={styles.eduYear}>Class of {e.year}</Text>
              </View>
              <TouchableOpacity onPress={() => setEdu(edu.filter((x) => x.id !== e.id))}>
                <Text style={styles.deleteBtn}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Cert Modal */}
      <Modal visible={certModal} animationType="slide" transparent onRequestClose={() => setCertModal(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Certification</Text>
            <TextInput style={styles.input} value={newCert} onChangeText={setNewCert}
              placeholder="Certification name" placeholderTextColor={GRAY_400} />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setCertModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addCert}>
                <Text style={styles.saveBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edu Modal */}
      <Modal visible={eduModal} animationType="slide" transparent onRequestClose={() => setEduModal(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Education</Text>
            {(['degree', 'institution', 'year'] as const).map((f) => (
              <TextInput key={f} style={styles.input}
                value={newEdu[f]} onChangeText={(v) => setNewEdu((p) => ({ ...p, [f]: v }))}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                placeholderTextColor={GRAY_400}
                keyboardType={f === 'year' ? 'numeric' : 'default'}
              />
            ))}
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEduModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={addEdu}>
                <Text style={styles.saveBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: PRIMARY_BG },
  header:      { paddingHorizontal: SPACE_LG, paddingVertical: SPACE_LG },
  title:       { fontSize: FONT_2XL, fontWeight: '800', color: GRAY_900 },
  subtitle:    { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  section:     { paddingHorizontal: SPACE_LG, marginBottom: SPACE_XL },
  sectionRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACE_MD },
  sectionTitle:{ fontSize: FONT_LG, fontWeight: '700', color: GRAY_900 },
  addBtn:      { backgroundColor: PRIMARY, paddingHorizontal: SPACE_LG, paddingVertical: SPACE_SM, borderRadius: RADIUS_LG },
  addBtnText:  { color: WHITE, fontWeight: '700', fontSize: FONT_SM },

  certCard:    { backgroundColor: WHITE, borderRadius: RADIUS_LG, padding: SPACE_MD, marginBottom: SPACE_SM, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: GRAY_200, ...SHADOW_SM },
  certIcon:    { width: 44, height: 44, borderRadius: 22, backgroundColor: PRIMARY_SUBTLE, justifyContent: 'center', alignItems: 'center', marginRight: SPACE_MD },
  certContent: { flex: 1 },
  certName:    { fontSize: FONT_MD, fontWeight: '600', color: GRAY_900 },
  certSub:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  deleteBtn:   { fontSize: 20, color: GRAY_400, padding: SPACE_SM },

  eduCard:     { backgroundColor: WHITE, borderRadius: RADIUS_LG, marginBottom: SPACE_SM, flexDirection: 'row', borderWidth: 1, borderColor: GRAY_200, overflow: 'hidden', ...SHADOW_SM },
  eduAccent:   { width: 4, backgroundColor: PRIMARY },
  eduContent:  { flex: 1, padding: SPACE_MD },
  eduDegree:   { fontSize: FONT_MD, fontWeight: '700', color: GRAY_900 },
  eduInst:     { fontSize: FONT_SM, color: GRAY_500, marginTop: 2 },
  eduYear:     { fontSize: FONT_SM, color: PRIMARY, fontWeight: '600', marginTop: 2 },

  overlay:   { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal:     { backgroundColor: WHITE, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: SPACE_2XL },
  modalTitle:{ fontSize: FONT_XL, fontWeight: '800', color: GRAY_900, marginBottom: SPACE_LG },
  input:     { backgroundColor: GRAY_100, borderRadius: RADIUS_LG, padding: SPACE_MD, fontSize: FONT_MD, borderWidth: 1, borderColor: GRAY_200, color: GRAY_900, marginBottom: SPACE_MD },
  modalBtns: { flexDirection: 'row', gap: SPACE_SM, marginTop: SPACE_SM },
  cancelBtn: { flex: 1, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: GRAY_100, borderWidth: 1, borderColor: GRAY_200 },
  cancelBtnText: { color: GRAY_600, fontWeight: '700' },
  saveBtn:   { flex: 2, paddingVertical: SPACE_LG, borderRadius: RADIUS_LG, alignItems: 'center', backgroundColor: PRIMARY },
  saveBtnText: { color: WHITE, fontWeight: '700' },
});